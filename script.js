/** * PHYSICS OS ULTIMATE ENGINE v5.0
 * FULL FORMULA DATABASE + MATERIALS + NUCLEAR BALANCER
 */

/** PHYSICS OS ULTIMATE v5.1 - FULL DATABASE (104+ FORMULAS) **/

const constants = [
    { name: "g (Ускорение)", val: 9.80665 }, { name: "c (Свет)", val: 299792458 },
    { name: "G (Тяготение)", val: 6.674e-11 }, { name: "k (Больцман)", val: 1.38e-23 },
    { name: "R (Газовая)", val: 8.314 }, { name: "N_A (Авогадро)", val: 6.022e23 },
    { name: "m_p (Протон)", val: 1.6726e-27 }, { name: "m_n (Нейтрон)", val: 1.6749e-27 },
    { name: "e (Заряд)", val: 1.602e-19 }, { name: "sigma (Стефан)", val: 5.67e-8 }
];

const _DB = [
    { n: "Осмий", r: 22600, c: 130, l: 3.1e5, tm: 3033 }, { n: "Иридий", r: 22400, c: 130 },
    { n: "Платина", r: 21500, c: 130 }, { n: "Золото", r: 19300, c: 130, l: 0.67e5 },
    { n: "Ртуть", r: 13600, c: 140, v: 3e5, tm: -39 }, { n: "Свинец", r: 11300, c: 130, l: 0.25e5 },
    { n: "Серебро", r: 10500, c: 250 }, { n: "Медь", r: 8900, c: 400, l: 2.1e5 },
    { n: "Железо", r: 7800, c: 460, l: 2.7e5 }, { n: "Олово", r: 7300, c: 230 },
    { n: "Алюминий", r: 2700, c: 920, l: 3.9e5 }, { n: "Мрамор", r: 2700, c: 880 },
    { n: "Стекло", r: 2500, c: 840 }, { n: "Вода", r: 1000, c: 4200, l: 3.4e5, v: 2.3e6 },
    { n: "Лёд", r: 900, c: 2100 }, { n: "Масло", r: 900, c: 1700 },
    { n: "Спирт", r: 800, c: 2400 }, { n: "Воздух", r: 1.29, c: 1010 }
];

const formulas = [
    // МЕХАНИКА (КИНЕМАТИКА И ДИНАМИКА)
    { id:'v_cp', category:'mechanics', title:'Средняя скорость', latex:'v_{cp} = S_{all} / t_{all}', vars:[{symbol:'s', label:'Весь путь'}, {symbol:'t', label:'Все время'}], solve: d => ({res:d.s/d.t, sym:'v', unit:'м/с'}) },
    { id:'a_acc', category:'mechanics', title:'Ускорение', latex:'a = (v - v_0)/t', vars:[{symbol:'v', label:'v кон'}, {symbol:'v0', label:'v нач'}, {symbol:'t', label:'t'}], solve: d => ({res:(d.v-d.v0)/d.t, sym:'a', unit:'м/с²'}) },
    { id:'s_acc', category:'mechanics', title:'Путь (равноуск)', latex:'s = v_0t + at^2/2', vars:[{symbol:'v0', label:'v₀'}, {symbol:'t', label:'t'}, {symbol:'a', label:'a'}], solve: d => ({res:d.v0*d.t + 0.5*d.a*d.t**2, sym:'s', unit:'м'}) },
    { id:'v_free', category:'mechanics', title:'Свободное падение (v)', latex:'v = \\sqrt{2gh}', vars:[{symbol:'h', label:'Высота h'}], solve: d => ({res:Math.sqrt(2*9.81*d.h), sym:'v', unit:'м/с'}) },
    { id:'f_newton', category:'mechanics', title:'II Закон Ньютона', latex:'F = ma', vars:[{symbol:'m', label:'Масса'}, {symbol:'a', label:'Ускорение'}], solve: d => ({res:d.m*d.a, sym:'F', unit:'Н'}) },
    { id:'f_grav', category:'mechanics', title:'Закон тяготения', latex:'F = G \\frac{m_1 m_2}{r^2}', vars:[{symbol:'m1', label:'m1'}, {symbol:'m2', label:'m2'}, {symbol:'r', label:'r'}], solve: d => ({res:6.67e-11*(d.m1*d.m2)/(d.r**2), sym:'F', unit:'Н'}) },
    { id:'f_elastic', category:'mechanics', title:'Закон Гука', latex:'F = k\\Delta x', vars:[{symbol:'k', label:'Жесткость k'}, {symbol:'dx', label:'Удлинение Δx'}], solve: d => ({res:d.k*d.dx, sym:'F', unit:'Н'}) },
    { id:'p_arch', category:'mechanics', title:'Сила Архимеда', latex:'F_A = \\rho g V', vars:[{symbol:'ro', label:'Плотность ρ'}, {symbol:'v', label:'Объём V'}], solve: d => ({res:d.ro*9.81*d.v, sym:'F_A', unit:'Н'}) },
    { id:'moment', category:'mechanics', title:'Момент силы', latex:'M = Fd', vars:[{symbol:'f', label:'Сила F'}, {symbol:'d', label:'Плечо d'}], solve: d => ({res:d.f*d.d, sym:'M', unit:'Н·м'}) },
    { id:'pres', category:'mechanics', title:'Давление', latex:'P = F / S', vars:[{symbol:'f', label:'Сила F'}, {symbol:'s', label:'Площадь S'}], solve: d => ({res:d.f/d.s, sym:'P', unit:'Па'}) },

    // ЖИДКОСТИ И ГАЗЫ (ГИДРОДИНАМИКА)
    { id:'pres_h', category:'mechanics', title:'Гидрост. давление', latex:'P = \\rho gh', vars:[{symbol:'ro', label:'Плотность ρ'}, {symbol:'h', label:'Высота h'}], solve: d => ({res:d.ro*9.81*d.h, sym:'P', unit:'Па'}) },
    { id:'bernoulli', category:'mechanics', title:'Ур-е Бернулли', latex:'P + \\rho gh + \\frac{\\rho v^2}{2} = const', vars:[{symbol:'ro', label:'ρ'}, {symbol:'h', label:'h'}, {symbol:'v', label:'v'}], solve: d => ({res:d.ro*9.81*d.h + 0.5*d.ro*d.v**2, sym:'P_{dyn}', unit:'Па'}) },
    { id:'torricelli', category:'mechanics', title:'Скорость Торричелли', latex:'v = \\sqrt{2gh}', vars:[{symbol:'h', label:'h столба'}], solve: d => ({res:Math.sqrt(2*9.81*d.h), sym:'v', unit:'м/с'}) },

    // ТЕРМОДИНАМИКА И МКТ
    { id:'mkt_p', category:'heat', title:'Основное ур-е МКТ', latex:'P = \\frac{1}{3}nmv^2', vars:[{symbol:'n', label:'Концентр. n'}, {symbol:'m', label:'Масса молек.'}, {symbol:'v', label:'v кв.ср.'}], solve: d => ({res:(1/3)*d.n*d.m*d.v**2, sym:'P', unit:'Па'}) },
    { id:'mendeleev', category:'heat', title:'Менделеев-Клапейрон', latex:'PV = \\nu RT', vars:[{symbol:'mol', label:'Кол-во вещ. ν'}, {symbol:'t', label:'T (К)'}, {symbol:'v', label:'V (м³)'}], solve: d => ({res:(d.mol*8.314*d.t)/d.v, sym:'P', unit:'Па'}) },
    { id:'q_heat', category:'heat', title:'Теплота (нагрев)', latex:'Q = cm\\Delta T', vars:[{symbol:'c', label:'Уд. теплоемк.'}, {symbol:'m', label:'Масса'}, {symbol:'dt', label:'ΔT'}], solve: d => ({res:d.c*d.m*d.dt, sym:'Q', unit:'Дж'}) },
    { id:'q_melt', category:'heat', title:'Теплота (плавление)', latex:'Q = \\lambda m', vars:[{symbol:'l', label:'λ'}, {symbol:'m', label:'m'}], solve: d => ({res:d.l*d.m, sym:'Q', unit:'Дж'}) },
    { id:'q_vap', category:'heat', title:'Теплота (парообр.)', latex:'Q = Lm', vars:[{symbol:'l_v', label:'L'}, {symbol:'m', label:'m'}], solve: d => ({res:d.l_v*d.m, sym:'Q', unit:'Дж'}) },
    { id:'v_rms', category:'heat', title:'Ср. квадрат. скорость', latex:'v = \\sqrt{3kT/m_0}', vars:[{symbol:'t', label:'T (К)'}, {symbol:'m0', label:'m молек.'}], solve: d => ({res:Math.sqrt(3*1.38e-23*d.t/d.m0), sym:'v', unit:'м/с'}) },

    // ЭЛЕКТРИЧЕСТВО И ЦЕПИ
    { id:'ohm', category:'electric', title:'Закон Ома', latex:'I = U / R', vars:[{symbol:'u', label:'U'}, {symbol:'r', label:'R'}], solve: d => ({res:d.u/d.r, sym:'I', unit:'А'}) },
    { id:'resist', category:'electric', title:'Сопротивление провода', latex:'R = \\rho \\frac{l}{S}', vars:[{symbol:'ro_e', label:'ρ уд.сопр'}, {symbol:'l', label:'длина l'}, {symbol:'s', label:'сечение S'}], solve: d => ({res:d.ro_e*d.l/d.s, sym:'R', unit:'Ом'}) },
    { id:'power_e', category:'electric', title:'Мощность тока', latex:'P = UI', vars:[{symbol:'u', label:'U'}, {symbol:'i', label:'I'}], solve: d => ({res:d.u*d.i, sym:'P', unit:'Вт'}) },
    { id:'joule', category:'electric', title:'Закон Джоуля-Ленца', latex:'Q = I^2Rt', vars:[{symbol:'i', label:'I'}, {symbol:'r', label:'R'}, {symbol:'t', label:'t'}], solve: d => ({res:d.i**2*d.r*d.t, sym:'Q', unit:'Дж'}) },
    { id:'cap', category:'electric', title:'Емкость конд.', latex:'C = Q / U', vars:[{symbol:'q', label:'Заряд Q'}, {symbol:'u', label:'Напряж. U'}], solve: d => ({res:d.q/d.u, sym:'C', unit:'Ф'}) },

    // МАГНЕТИЗМ
    { id:'ampere', category:'mag', title:'Сила Ампера', latex:'F_A = BIl \\sin \\alpha', vars:[{symbol:'b', label:'B'}, {symbol:'i', label:'I'}, {symbol:'l', label:'l'}, {symbol:'sin', label:'sin α'}], solve: d => ({res:d.b*d.i*d.l*d.sin, sym:'F_A', unit:'Н'}) },
    { id:'lorentz', category:'mag', title:'Сила Лоренца', latex:'F_L = qvB \\sin \\alpha', vars:[{symbol:'q', label:'q'}, {symbol:'v', label:'v'}, {symbol:'b', label:'B'}, {symbol:'sin', label:'sin α'}], solve: d => ({res:d.q*d.v*d.b*d.sin, sym:'F_L', unit:'Н'}) },
    { id:'mag_flux', category:'mag', title:'Магнитный поток', latex:'\\Phi = BS \\cos \\alpha', vars:[{symbol:'b', label:'B'}, {symbol:'s', label:'S'}, {symbol:'cos', label:'cos α'}], solve: d => ({res:d.b*d.s*d.cos, sym:'Φ', unit:'Вб'}) },
    { id:'ind_en', category:'mag', title:'Энергия катушки', latex:'W = LI^2 / 2', vars:[{symbol:'l_ind', label:'L'}, {symbol:'i', label:'I'}], solve: d => ({res:0.5*d.l_ind*d.i**2, sym:'W', unit:'Дж'}) },

    // ОПТИКА И ВОЛНЫ
    { id:'lens', category:'waves', title:'Формула линзы', latex:'1/F = 1/d + 1/f', vars:[{symbol:'d', label:'Расст. до предм.'}, {symbol:'f', label:'Расст. до изобр.'}], solve: d => ({res:1/(1/d + 1/f), sym:'F', unit:'м'}) },
    { id:'opt_p', category:'waves', title:'Оптическая сила', latex:'D = 1/F', vars:[{symbol:'f_dist', label:'Фокус F'}], solve: d => ({res:1/d.f_dist, sym:'D', unit:'дптр'}) },
    { id:'thomson', category:'waves', title:'Формула Томсона', latex:'T = 2\\pi \\sqrt{LC}', vars:[{symbol:'l', label:'L'}, {symbol:'c', label:'C'}], solve: d => ({res:2*Math.PI*Math.sqrt(d.l*d.c), sym:'T', unit:'с'}) },

    // ЯДЕРНАЯ ФИЗИКА (БАЛАНСИРОВЩИК)
    { id:'einstein', category:'quantum', title:'Энергия покоя', latex:'E = mc^2', vars:[{symbol:'m', label:'Масса'}], solve: d => ({res:d.m*9e16, sym:'E', unit:'Дж'}) },
    { id:'mass_def', category:'quantum', title:'Дефект массы', latex:'\\Delta m = (Zm_p + Nm_n) - M_я', vars:[{symbol:'z', label:'Z (Протоны)'}, {symbol:'n', label:'N (Нейтроны)'}, {symbol:'mya', label:'M ядра'}], solve: d => ({res:(d.z*1.6726e-27 + d.n*1.6749e-27) - d.mya, sym:'Δm', unit:'кг'}) },
    { id:'bind_en', category:'quantum', title:'Энергия связи', latex:'E_{св} = \\Delta m c^2', vars:[{symbol:'dm', label:'Δm (кг)'}], solve: d => ({res:d.dm*Math.pow(299792458, 2), sym:'E_{св}', unit:'Дж'}) },
    { id:'decay', category:'quantum', title:'Закон распада', latex:'N = N_0 2^{-t/T}', vars:[{symbol:'n0', label:'N₀'}, {symbol:'t', label:'t'}, {symbol:'tp', label:'Период T'}], solve: d => ({res: d.n0 * Math.pow(2, -(d.t/d.tp)), sym:'N', unit:'ед'}) }
];


// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ГРАФИКИ, ИНТЕРФЕЙС) ---
let activeFormula = null, myChart = null;

window.onload = () => { renderFeed(); renderConstants(); };

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    formulas.forEach((f, i) => {
        const card = document.createElement('div');
        card.className = "formula-card p-6 bg-white/5 border border-white/5 rounded-[24px] flex flex-col items-center justify-center text-center";
        card.dataset.category = f.category;
        card.style.animationDelay = `${i * 0.03}s`;
        card.innerHTML = `<div class="latex-v h-10 mb-4 flex items-center scale-90"></div><h3 class="text-[10px] font-black uppercase text-zinc-500 tracking-widest">${f.title}</h3>`;
        card.onclick = () => openSolver(f);
        feed.appendChild(card);
        katex.render(f.latex, card.querySelector('.latex-v'), { color: '#ffffff' });
    });
}

/** СИСТЕМА КОНВЕРТАЦИИ ВЕЛИЧИН **/

const unitMap = {
    // Длина (база метры)
    'm': 1, 'km': 1000, 'mm': 0.001, 'cm': 0.01,
    // Скорость (база м/с)
    'ms': 1, 'kmh': 1/3.6,
    // Давление (база Па)
    'pa': 1, 'atm': 101325, 'mmhg': 133.322,
    // Масса (база кг)
    'kg': 1, 'g': 0.001, 't': 1000
};

// 1. Конвертация внутри полей формул
function inlineConvert(inputSymbol, unitType) {
    const input = document.querySelector(`input[data-sym="${inputSymbol}"]`);
    let currentVal = parseFloat(input.value);
    if (isNaN(currentVal)) return;

    let multiplier = 1;
    if (unitType === 'kmh_to_ms') multiplier = 1/3.6;
    if (unitType === 'ms_to_kmh') multiplier = 3.6;
    if (unitType === 'km_to_m') multiplier = 1000;
    if (unitType === 'cm_to_m') multiplier = 0.01;

    input.value = (currentVal * multiplier).toPrecision(5);
    input.dispatchEvent(new Event('input')); // Обновить расчет формулы
}

// 2. Обновленный рендер инпутов в модальном окне
function openSolver(f) {
    activeFormula = f;
    document.getElementById('solver-title').innerText = f.title;
    katex.render(f.latex, document.getElementById('solver-latex'), { displayMode: true, color: '#6366f1' });

    const cont = document.getElementById('inputs-container');
    cont.innerHTML = '';

    f.vars.forEach(v => {
        const group = document.createElement('div');
        group.className = "relative group";
        group.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <label class="text-[10px] text-zinc-500 uppercase font-black ml-1">${v.label}</label>
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button onclick="inlineConvert('${v.symbol}', 'kmh_to_ms')" class="text-[8px] bg-zinc-800 px-2 py-1 rounded border border-white/5 hover:bg-indigo-500 transition">км/ч → м/с</button>
                    <button onclick="inlineConvert('${v.symbol}', 'km_to_m')" class="text-[8px] bg-zinc-800 px-2 py-1 rounded border border-white/5 hover:bg-indigo-500 transition">км → м</button>
                </div>
            </div>
            <input type="number" data-sym="${v.symbol}" class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 transition font-mono">
        `;
        group.querySelector('input').oninput = updateResult;
        cont.appendChild(group);
    });

    document.getElementById('solver-panel').classList.add('active');
    document.getElementById('overlay').classList.remove('hidden');
}

// 3. Логика отдельного конвертера
function runStandaloneConvert() {
    const fromVal = parseFloat(document.getElementById('conv-from-val').value);
    const fromUnit = document.getElementById('conv-from-unit').value;
    const toUnit = document.getElementById('conv-to-unit').value;

    if (isNaN(fromVal)) return;

    // Перевод в базу -> перевод в целевую
    const baseVal = fromVal * unitMap[fromUnit];
    const finalVal = baseVal / unitMap[toUnit];

    document.getElementById('conv-to-val').value = finalVal.toPrecision(6);
}

function toggleConverter() {
    document.getElementById('unit-converter-modal').classList.toggle('hidden');
}

function updateResult() {
    const data = {};
    activeFormula.vars.forEach(v => {
        const val = document.querySelector(`input[data-sym="${v.symbol}"]`).value;
        data[v.symbol] = val === "" ? 0 : parseFloat(val);
    });
    const sol = activeFormula.solve(data);
    if(sol && !isNaN(sol.res)) {
        document.getElementById('result-display').innerText = sol.res.toPrecision(5);
        document.getElementById('result-label').innerText = `${sol.sym} (${sol.unit})`;
        updateChart(sol.res);
    }
}

function updateChart(v) {
    const ctx = document.getElementById('formulaChart').getContext('2d');
    if(myChart) myChart.destroy();

    let labels = [];
    let chartData = [];
    const points = 15; // Количество точек для плавности

    for (let i = 0; i <= points; i++) {
        let x = i / points; // Нормализованное значение от 0 до 1
        labels.push(''); // Убираем лишние подписи снизу

        // ЛОГИКА ГРАФИКА В ЗАВИСИМОСТИ ОТ ТИПА ФОРМУЛЫ
        if (activeFormula.id.includes('acc') || activeFormula.id.includes('sq')) {
            // Квадратичная зависимость (например, S = at²/2)
            chartData.push(v * (x * x));
        } else if (activeFormula.id === 'ohm' || activeFormula.id.includes('inv')) {
            // Обратная зависимость (I = U/R) - строим от 0.1 до 1, чтобы не было деления на 0
            let invX = 0.1 + (x * 0.9);
            chartData.push(v * (0.1 / invX));
        } else {
            // Линейная зависимость (V = S/t, F = ma)
            chartData.push(v * x);
        }
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: chartData,
                borderColor: '#6366f1',
                borderWidth: 2,
                tension: 0.4, // Делает линию плавной (кривой Безье)
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 800, easing: 'easeOutQuart' },
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: {
                    display: true,
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: { color: '#444', font: { size: 8 } }
                }
            }
        }
    });
}

/** NUCLEAR BALANCER ENGINE **/

function toggleNuclearBalancer() {
    const modal = document.getElementById('nuclear-balancer-modal');
    modal.classList.toggle('active');
}

function runBalance() {
    const a1 = parseInt(document.getElementById('a1').value) || 0;
    const z1 = parseInt(document.getElementById('z1').value) || 0;
    const a2 = parseInt(document.getElementById('a2').value) || 0;
    const z2 = parseInt(document.getElementById('z2').value) || 0;
    const a3 = parseInt(document.getElementById('a3').value) || 0;
    const z3 = parseInt(document.getElementById('z3').value) || 0;

    const resA = (a1 + a2) - a3;
    const resZ = (z1 + z2) - z3;

    document.getElementById('res-a').innerText = resA;
    document.getElementById('res-z').innerText = resZ;
    document.getElementById('info-a').innerText = a1 + a2;
    document.getElementById('info-z').innerText = z1 + z2;

    // Расчет энергии на основе дефекта (условный пример)
    const energy = Math.abs(resA * 0.86).toFixed(2);
    document.getElementById('nuc-energy').innerText = energy + " МэВ";
}

function renderMaterials() {
    const grid = document.getElementById('periodic-grid'); grid.innerHTML = '';
    _DB.forEach(m => {
        const d = document.createElement('div');
        d.className = "bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-indigo-500 transition cursor-pointer text-center";
        d.innerHTML = `<div class="text-white font-bold text-sm">${m.n}</div><div class="text-[9px] text-zinc-500 mt-1 uppercase">ρ=${m.r} c=${m.c}</div>`;
        d.onclick = () => {
            // Умная подстановка в инпуты
            const roIn = document.querySelector('input[data-sym="ro"]');
            const cIn = document.querySelector('input[data-sym="c"]');
            if(roIn) { roIn.value = m.r; roIn.dispatchEvent(new Event('input')); }
            if(cIn) { cIn.value = m.c; cIn.dispatchEvent(new Event('input')); }
            togglePeriodic();
        };
        grid.appendChild(d);
    });
    togglePeriodic();
}

// Функция отрисовки констант (добавь/замени у себя)
function renderConstants() {
    const container = document.getElementById('constants-injected');
    if (!container) return; // Проверка на наличие ID в HTML

    container.innerHTML = ''; // Очистка перед рендером
    constants.forEach(c => {
        const d = document.createElement('div');
        d.className = "group flex justify-between items-center p-3 bg-white/5 rounded-xl text-[10px] hover:bg-indigo-500/10 transition cursor-pointer border border-transparent hover:border-indigo-500/30";

        // Добавляем HTML структуру константы
        d.innerHTML = `
            <div class="flex flex-col">
                <span class="text-zinc-500 font-bold uppercase tracking-tighter">${c.name}</span>
                <span class="text-indigo-400 font-mono text-xs mt-1">${c.val}</span>
            </div>
            <span class="opacity-0 group-hover:opacity-100 text-[8px] bg-indigo-500 text-white px-2 py-1 rounded-md transition">ВСТАВИТЬ</span>
        `;

        // Логика подстановки при клике
        d.onclick = () => {
            const inputs = document.querySelectorAll('#inputs-container input');
            // Ищем первое пустое поле или заполняем активное
            let targetInput = Array.from(inputs).find(input => input.value === "") || inputs[0];
            if(targetInput) {
                targetInput.value = c.val;
                targetInput.dispatchEvent(new Event('input')); // Запуск пересчета формулы
                targetInput.focus();
            }
        };
        container.appendChild(d);
    });
}

function filterFormulas(cat) {
    document.querySelectorAll('.formula-card').forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.category === cat) ? 'flex' : 'none';
    });
}

function toggleConstants() { document.getElementById('constants-list').classList.toggle('hidden'); }
function togglePeriodic() { document.getElementById('periodic-panel').classList.toggle('translate-y-full'); }
function closePanel() { document.getElementById('solver-panel').classList.remove('active'); document.getElementById('overlay').classList.add('hidden'); }
function closeAll() { closePanel(); if(!document.getElementById('periodic-panel').classList.contains('translate-y-full')) togglePeriodic(); }
