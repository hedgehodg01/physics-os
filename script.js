if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('PhysicsOS: Service Worker Registered'));
}

const formulas = [
    // --- МЕХАНИКА ---
    { id: 'velocity', category: 'mechanics', title: 'Скорость', latex: 'v = S / t', desc: 'Отношение пройденного пути ко времени.', vars: [{ symbol: 's', label: 'Путь', units: { 'м': 1, 'км': 1000 } }, { symbol: 't', label: 'Время', units: { 'с': 1, 'мин': 60, 'ч': 3600 } }], calc: (d) => (d.t || 0) !== 0 ? (d.s || 0) / d.t : 0 },
    { id: 'acceleration', category: 'mechanics', title: 'Ускорение', latex: 'a = (v - v_0) / t', desc: 'Изменение скорости в единицу времени.', vars: [{ symbol: 'v', label: 'Кон. скорость', units: { 'м/с': 1 } }, { symbol: 'v0', label: 'Нач. скорость', units: { 'м/с': 1 } }, { symbol: 't', label: 'Время', units: { 'с': 1 } }], calc: (d) => (d.t || 0) !== 0 ? (d.v - d.v0) / d.t : 0 },
    { id: 'gravity', category: 'mechanics', title: 'Сила тяжести', latex: 'F = m \\cdot g', desc: 'Сила притяжения к Земле.', vars: [{ symbol: 'm', label: 'Масса', units: { 'кг': 1, 'г': 0.001 } }, { symbol: 'g', label: 'Ускорение g', units: { 'м/с²': 1 } }], calc: (d) => (d.m || 0) * (d.g || 9.806) },
    { id: 'density', category: 'mechanics', title: 'Плотность', latex: '\\rho = m / V', desc: 'Масса вещества в единице объема.', vars: [{ symbol: 'm', label: 'Масса', units: { 'кг': 1, 'г': 0.001 } }, { symbol: 'v', label: 'Объем', units: { 'м³': 1, 'л': 0.001, 'см³': 0.000001 } }], calc: (d) => (d.v || 0) !== 0 ? (d.m || 0) / d.v : 0 },
    { id: 'momentum', category: 'mechanics', title: 'Импульс', latex: 'p = m \\cdot v', desc: 'Количество движения тела.', vars: [{ symbol: 'm', label: 'Масса', units: { 'кг': 1 } }, { symbol: 'v', label: 'Скорость', units: { 'м/с': 1 } }], calc: (d) => (d.m || 0) * (d.v || 0) },
    { id: 'kin-energy', category: 'mechanics', title: 'Кинетическая энергия', latex: 'E_k = \\frac{mv^2}{2}', desc: 'Энергия движущегося тела.', vars: [{ symbol: 'm', label: 'Масса', units: { 'кг': 1 } }, { symbol: 'v', label: 'Скорость', units: { 'м/с': 1 } }], calc: (d) => ((d.m || 0) * Math.pow(d.v || 0, 2)) / 2 },

    // --- ДАВЛЕНИЕ ---
    { id: 'pressure-s', category: 'pressure', title: 'Давление твердых тел', latex: 'p = F / S', desc: 'Сила на единицу площади.', vars: [{ symbol: 'f', label: 'Сила', units: { 'Н': 1 } }, { symbol: 's', label: 'Площадь', units: { 'м²': 1, 'см²': 0.0001 } }], calc: (d) => (d.s || 0) !== 0 ? (d.f || 0) / d.s : 0 },
    { id: 'pressure-liq', category: 'pressure', title: 'Давление в жидкости', latex: 'p = \\rho g h', desc: 'Гидростатическое давление.', vars: [{ symbol: 'rho', label: 'Плотность', units: { 'кг/м³': 1 } }, { symbol: 'h', label: 'Глубина', units: { 'м': 1, 'см': 0.01 } }], calc: (d) => (d.rho || 0) * 9.806 * (d.h || 0) },
    { id: 'archimedes', category: 'pressure', title: 'Сила Архимеда', latex: 'F_a = \\rho g V', desc: 'Выталкивающая сила в жидкости или газе.', vars: [{ symbol: 'rho', label: 'Плотность среды', units: { 'кг/м³': 1 } }, { symbol: 'v', label: 'Объем тела', units: { 'м³': 1, 'л': 0.001 } }], calc: (d) => (d.rho || 0) * 9.806 * (d.v || 0) },

    // --- ТЕПЛОТА ---
    { id: 'heat-q', category: 'heat', title: 'Нагревание/Охлаждение', latex: 'Q = cm\\Delta t', desc: 'Теплота при изменении температуры.', vars: [{ symbol: 'c', label: 'Теплоемкость', units: { 'Дж/кг·C': 1 } }, { symbol: 'm', label: 'Масса', units: { 'кг': 1 } }, { symbol: 'dt', label: 'Δt', units: { '°C': 1 } }], calc: (d) => (d.c || 0) * (d.m || 0) * (d.dt || 0) },
    { id: 'heat-burn', category: 'heat', title: 'Сгорание топлива', latex: 'Q = q \\cdot m', desc: 'Энергия при полном сгорании топлива.', vars: [{ symbol: 'q', label: 'Уд. теплота сгорания', units: { 'Дж/кг': 1, 'МДж/кг': 1e6 } }, { symbol: 'm', label: 'Масса', units: { 'кг': 1 } }], calc: (d) => (d.q || 0) * (d.m || 0) },
    { id: 'heat-melt', category: 'heat', title: 'Плавление', latex: 'Q = \\lambda \\cdot m', desc: 'Теплота для превращения в жидкость.', vars: [{ symbol: 'l', label: 'Уд. теплота плавления', units: { 'Дж/кг': 1, 'кДж/кг': 1000 } }, { symbol: 'm', label: 'Масса', units: { 'кг': 1 } }], calc: (d) => (d.l || 0) * (d.m || 0) },

    // --- ЭЛЕКТРИКА ---
    { id: 'ohm-law', category: 'electric', title: 'Закон Ома', latex: 'I = U / R', desc: 'Сила тока через напряжение и сопротивление.', vars: [{ symbol: 'u', label: 'Напряжение', units: { 'В': 1, 'мВ': 0.001 } }, { symbol: 'r', label: 'Сопротивление', units: { 'Ом': 1, 'кОм': 1000 } }], calc: (d) => (d.r || 0) !== 0 ? (d.u || 0) / d.r : 0 },
    { id: 'work-elec', category: 'electric', title: 'Работа тока', latex: 'A = U I t', desc: 'Энергия электрического тока.', vars: [{ symbol: 'u', label: 'Напряжение', units: { 'В': 1 } }, { symbol: 'i', label: 'Сила тока', units: { 'А': 1 } }, { symbol: 't', label: 'Время', units: { 'с': 1, 'мин': 60 } }], calc: (d) => (d.u || 0) * (d.i || 0) * (d.t || 0) },
    { id: 'power-elec', category: 'electric', title: 'Мощность тока', latex: 'P = U \\cdot I', desc: 'Скорость совершения работы током.', vars: [{ symbol: 'u', label: 'Напряжение', units: { 'В': 1 } }, { symbol: 'i', label: 'Сила тока', units: { 'А': 1 } }], calc: (d) => (d.u || 0) * (d.i || 0) },
    { id: 'resistance', category: 'electric', title: 'Сопротивление проводника', latex: 'R = \\rho \\frac{L}{S}', desc: 'Зависимость от материала и размеров.', vars: [{ symbol: 'rho', label: 'Уд. сопротивление', units: { 'Ом·мм²/м': 1 } }, { symbol: 'l', label: 'Длина', units: { 'м': 1 } }, { symbol: 's', label: 'Сечение', units: { 'мм²': 1 } }], calc: (d) => (d.s || 0) !== 0 ? (d.rho || 0) * (d.l || 0) / d.s : 0 },

    // --- ОПТИКА ---
    { id: 'refraction', category: 'optics', title: 'Закон преломления', latex: 'n = \\sin(a) / \\sin(b)', desc: 'Показатель преломления среды.', vars: [{ symbol: 'sinA', label: 'sin угла падения', units: { 'ед': 1 } }, { symbol: 'sinB', label: 'sin угла преломл.', units: { 'ед': 1 } }], calc: (d) => (d.sinB || 0) !== 0 ? (d.sinA || 0) / d.sinB : 0 },
    { id: 'opt-power', category: 'optics', title: 'Оптическая сила линзы', latex: 'D = 1 / F', desc: 'Преломляющая способность (Диоптрии).', vars: [{ symbol: 'f', label: 'Фокусное расстояние', units: { 'м': 1, 'см': 0.01 } }], calc: (d) => (d.f || 0) !== 0 ? 1 / d.f : 0 },
    { id: 'magnification', category: 'optics', title: 'Увеличение линзы', latex: '\\Gamma = f / d', desc: 'Отношение расстояний от линзы.', vars: [{ symbol: 'f', label: 'Расст. до изобр.', units: { 'м': 1 } }, { symbol: 'd', label: 'Расст. до предм.', units: { 'м': 1 } }], calc: (d) => (d.d || 0) !== 0 ? (d.f || 0) / d.d : 0 },
    { id: 'wavelength', category: 'optics', title: 'Длина волны', latex: '\\lambda = v / f', desc: 'Связь скорости и частоты света.', vars: [{ symbol: 'v', label: 'Скорость (c)', units: { 'м/с': 1 } }, { symbol: 'f', label: 'Частота', units: { 'Гц': 1, 'МГц': 1e6 } }], calc: (d) => (d.f || 0) !== 0 ? (d.v || 0) / d.f : 0 }
];

const constants = [
    { name: 'Ускорение g', val: 9.806 },
    { name: 'Скорость света c', val: 299792458 },
    { name: 'Постоянная G', val: 6.674e-11 },
    { name: 'Плотность воды', val: 1000 },
    { name: 'Число Пи', val: 3.14159 }
];

let activeFormula = null, currentInputs = {}, multipliers = {};

document.addEventListener('DOMContentLoaded', () => {
    renderFeed();
    renderConstants();
    document.getElementById('overlay').onclick = closePanel;
});

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    const isLight = document.body.classList.contains('light');
    formulas.forEach(f => {
        const card = document.createElement('div');
        card.className = "formula-card rounded-2xl p-6 cursor-pointer group";
        card.dataset.category = f.category;
        card.dataset.id = f.id;
        card.innerHTML = `<div class="latex-view text-xl mb-4"></div><div class="flex justify-between items-center text-zinc-400 group-hover:text-white transition"><span class="font-semibold">${f.title}</span><span class="text-[10px] font-mono opacity-50 uppercase tracking-tighter">${f.category}</span></div>`;
        card.onclick = () => openSolver(f);
        feed.appendChild(card);
        katex.render(f.latex, card.querySelector('.latex-view'), { displayMode: true, color: isLight ? '#18181b' : '#f4f4f5' });
    });
}

function openSolver(f) {
    activeFormula = f; currentInputs = {}; multipliers = {};
    const isLight = document.body.classList.contains('light');
    document.getElementById('solver-title').innerText = f.title;
    document.getElementById('solver-desc').innerText = f.desc;
    katex.render(f.latex, document.getElementById('solver-latex'), { displayMode: true, color: isLight ? '#18181b' : '#f4f4f5' });
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    f.vars.forEach(v => {
        currentInputs[v.symbol] = 0;
        const firstUnit = Object.keys(v.units)[0];
        multipliers[v.symbol] = v.units[firstUnit];
        const group = document.createElement('div');
        group.innerHTML = `<label class="block text-[10px] font-mono text-zinc-500 uppercase mb-2">${v.label}</label><div class="flex gap-2"><input type="number" step="any" placeholder="0" class="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white mono focus:border-indigo-500 outline-none transition"><select class="bg-zinc-900 border border-white/10 rounded-xl text-xs px-2 text-zinc-400 outline-none">${Object.keys(v.units).map(u => `<option value="${v.units[u]}">${u}</option>`).join('')}</select></div>`;
        const input = group.querySelector('input');
        const select = group.querySelector('select');
        input.oninput = (e) => { currentInputs[v.symbol] = (parseFloat(e.target.value) || 0) * multipliers[v.symbol]; updateResult(); };
        select.onchange = (e) => { multipliers[v.symbol] = parseFloat(e.target.value); currentInputs[v.symbol] = (parseFloat(input.value) || 0) * multipliers[v.symbol]; updateResult(); };
        container.appendChild(group);
    });
    updateResult();
    document.getElementById('solver-panel').classList.remove('translate-x-full');
    document.getElementById('overlay').classList.replace('opacity-0', 'opacity-100');
    document.getElementById('overlay').classList.remove('pointer-events-none');
}

function updateResult() {
    if (!activeFormula) return;
    const res = activeFormula.calc(currentInputs);
    document.getElementById('result-display').innerText = typeof res === 'number' ? (res % 1 === 0 ? res : res.toFixed(4)) : res;
}

function toggleTheme() {
    document.body.classList.toggle('light');
    document.getElementById('theme-icon').innerText = document.body.classList.contains('light') ? '☀️' : '🌙';
    renderFeed();
    if (activeFormula) openSolver(activeFormula);
}

function renderConstants() {
    const container = document.getElementById('constants-injected');
    constants.forEach(c => {
        const div = document.createElement('div');
        div.className = 'constant-item';
        div.innerHTML = `<span class="text-xs">${c.name}</span><span class="constant-val font-mono">${c.val.toExponential(2)}</span>`;
        div.onclick = () => {
            const input = document.querySelector('#inputs-container input');
            if (input) { input.value = c.val; input.dispatchEvent(new Event('input')); }
        };
        container.appendChild(div);
    });
}

function toggleConstants() { document.getElementById('constants-list').classList.toggle('hidden'); }

function closePanel() {
    document.getElementById('solver-panel').classList.add('translate-x-full');
    document.getElementById('overlay').classList.replace('opacity-100', 'opacity-0');
    document.getElementById('overlay').classList.add('pointer-events-none');
}

function filterFormulas(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.innerText.toLowerCase() === (cat === 'all' ? 'все' : cat === 'mechanics' ? 'механика' : cat === 'pressure' ? 'давление' : cat === 'heat' ? 'теплота' : cat === 'electric' ? 'электрика' : 'оптика')));
    document.querySelectorAll('.formula-card').forEach(c => c.classList.toggle('hidden', cat !== 'all' && c.dataset.category !== cat));
}

function exportToPDF() {
    const { jsPDF } = window.jspdf; const doc = new jsPDF();
    doc.setFontSize(22); doc.text("Physics OS Report", 20, 20);
    doc.setFontSize(14); doc.text(`Formula: ${activeFormula.title}`, 20, 40);
    let y = 60;
    Object.keys(currentInputs).forEach(k => { doc.text(`${k}: ${currentInputs[k]} SI`, 20, y); y += 10; });
    doc.setTextColor(99, 102, 241); doc.text(`Result: ${document.getElementById('result-display').innerText}`, 20, y + 10);
    doc.save('solution.pdf');
}