// База данных формул (добавлены остальные по твоему образцу)
const formulas = [
    // МЕХАНИКА (КИНЕМАТИКА И ДИНАМИКА)
    { id:'v_cp', category:'mechanics', title:'Средняя скорость', latex:'v_{cp} = S_{all} / t_{all}', vars:[{symbol:'s', label:'Весь путь'}, {symbol:'t', label:'Все время'}], solve: d => ({res:d.s/d.t, sym:'v', unit:'м/с'}) },
    { id:'a_acc', category:'mechanics', title:'Ускорение', latex:'a = (v - v_0)/t', vars:[{symbol:'v', label:'v кон'}, {symbol:'v0', label:'v нач'}, {symbol:'t', label:'t'}], solve: d => ({res:(d.v-d.v0)/d.t, sym:'a', unit:'м/с²'}) },
    { id:'s_acc', category:'mechanics', title:'Путь (равноуск)', latex:'s = v_0t + at^2/2', vars:[{symbol:'v0', label:'v₀'}, {symbol:'t', label:'t'}, {symbol:'a', label:'a'}], solve: d => ({res:d.v0*d.t + 0.5*d.a*d.t**2, sym:'s', unit:'м'}) },
    { id:'v_free', category:'mechanics', title:'Свободное падение (v)', latex:'v = \\sqrt{2gh}', vars:[{symbol:'h', label:'Высота h'}], solve: d => ({res:Math.sqrt(2*9.80665*d.h), sym:'v', unit:'м/с'}) },
    { id:'f_newton', category:'mechanics', title:'II Закон Ньютона', latex:'F = ma', vars:[{symbol:'m', label:'Масса'}, {symbol:'a', label:'Ускорение'}], solve: d => ({res:d.m*d.a, sym:'F', unit:'Н'}) },
    { id:'f_grav', category:'mechanics', title:'Закон тяготения', latex:'F = G \\frac{m_1 m_2}{r^2}', vars:[{symbol:'m1', label:'m1'}, {symbol:'m2', label:'m2'}, {symbol:'r', label:'r'}], solve: d => ({res:6.674e-11*(d.m1*d.m2)/(d.r**2), sym:'F', unit:'Н'}) },
    { id:'f_elastic', category:'mechanics', title:'Закон Гука', latex:'F = k\\Delta x', vars:[{symbol:'k', label:'Жесткость k'}, {symbol:'dx', label:'Удлинение Δx'}], solve: d => ({res:d.k*d.dx, sym:'F', unit:'Н'}) },
    { id:'p_arch', category:'mechanics', title:'Сила Архимеда', latex:'F_A = \\rho g V', vars:[{symbol:'ro', label:'Плотность ρ'}, {symbol:'v', label:'Объём V'}], solve: d => ({res:d.ro*9.80665*d.v, sym:'F_A', unit:'Н'}) },
    { id:'moment', category:'mechanics', title:'Момент силы', latex:'M = Fd', vars:[{symbol:'f', label:'Сила F'}, {symbol:'d', label:'Плечо d'}], solve: d => ({res:d.f*d.d, sym:'M', unit:'Н·м'}) },
    { id:'pres', category:'mechanics', title:'Давление', latex:'P = F / S', vars:[{symbol:'f', label:'Сила F'}, {symbol:'s', label:'Площадь S'}], solve: d => ({res:d.f/d.s, sym:'P', unit:'Па'}) },

    // ЖИДКОСТИ И ГАЗЫ (ГИДРОДИНАМИКА)
    { id:'pres_h', category:'mechanics', title:'Гидрост. давление', latex:'P = \\rho gh', vars:[{symbol:'ro', label:'Плотность ρ'}, {symbol:'h', label:'Высота h'}], solve: d => ({res:d.ro*9.80665*d.h, sym:'P', unit:'Па'}) },
    { id:'bernoulli', category:'mechanics', title:'Ур-е Бернулли', latex:'P + \\rho gh + \\frac{\\rho v^2}{2} = const', vars:[{symbol:'ro', label:'ρ'}, {symbol:'h', label:'h'}, {symbol:'v', label:'v'}], solve: d => ({res:d.ro*9.80665*d.h + 0.5*d.ro*d.v**2, sym:'P_{dyn}', unit:'Па'}) },
    { id:'torricelli', category:'mechanics', title:'Скорость Торричелли', latex:'v = \\sqrt{2gh}', vars:[{symbol:'h', label:'h столба'}], solve: d => ({res:Math.sqrt(2*9.80665*d.h), sym:'v', unit:'м/с'}) },

    // ТЕРМОДИНАМИКА И МКТ
    { id:'mkt_p', category:'heat', title:'Основное ур-е МКТ', latex:'P = \\frac{1}{3}nmv^2', vars:[{symbol:'n', label:'Концентр. n'}, {symbol:'m', label:'Масса молек.'}, {symbol:'v', label:'v кв.ср.'}], solve: d => ({res:(1/3)*d.n*d.m*d.v**2, sym:'P', unit:'Па'}) },
    { id:'mendeleev', category:'heat', title:'Менделеев-Клапейрон', latex:'PV = \\nu RT', vars:[{symbol:'mol', label:'Кол-во вещ. ν'}, {symbol:'t', label:'T (К)'}, {symbol:'v', label:'V (м³)'}], solve: d => ({res:(d.mol*8.314*d.t)/d.v, sym:'P', unit:'Па'}) },
    { id:'q_heat', category:'heat', title:'Теплота (нагрев)', latex:'Q = cm\\Delta T', vars:[{symbol:'c', label:'Уд. теплоемк.'}, {symbol:'m', label:'Масса'}, {symbol:'dt', label:'ΔT'}], solve: d => ({res:d.c*d.m*d.dt, sym:'Q', unit:'Дж'}) },
    { id:'q_melt', category:'heat', title:'Теплота (плавление)', latex:'Q = \\lambda m', vars:[{symbol:'l', label:'λ'}, {symbol:'m', label:'m'}], solve: d => ({res:d.l*d.m, sym:'Q', unit:'Дж'}) },
    { id:'q_vap', category:'heat', title:'Теплота (парообр.)', latex:'Q = Lm', vars:[{symbol:'lv', label:'L'}, {symbol:'m', label:'m'}], solve: d => ({res:d.lv*d.m, sym:'Q', unit:'Дж'}) },
    { id:'v_rms', category:'heat', title:'Ср. квадрат. скорость', latex:'v = \\sqrt{3kT/m_0}', vars:[{symbol:'t', label:'T (К)'}, {symbol:'m0', label:'m молек.'}], solve: d => ({res:Math.sqrt(3*1.38e-23*d.t/d.m0), sym:'v', unit:'м/с'}) },

    // ЭЛЕКТРИЧЕСТВО И ЦЕПИ
    { id:'ohm', category:'electric', title:'Закон Ома', latex:'I = U / R', vars:[{symbol:'u', label:'U'}, {symbol:'r', label:'R'}], solve: d => ({res:d.u/d.r, sym:'I', unit:'А'}) },
    { id:'resist', category:'electric', title:'Сопротивление провода', latex:'R = \\rho \\frac{l}{S}', vars:[{symbol:'roe', label:'ρ уд.сопр'}, {symbol:'l', label:'длина l'}, {symbol:'s', label:'сечение S'}], solve: d => ({res:d.roe*d.l/d.s, sym:'R', unit:'Ом'}) },
    { id:'power_e', category:'electric', title:'Мощность тока', latex:'P = UI', vars:[{symbol:'u', label:'U'}, {symbol:'i', label:'I'}], solve: d => ({res:d.u*d.i, sym:'P', unit:'Вт'}) },
    { id:'joule', category:'electric', title:'Закон Джоуля-Ленца', latex:'Q = I^2Rt', vars:[{symbol:'i', label:'I'}, {symbol:'r', label:'R'}, {symbol:'t', label:'t'}], solve: d => ({res:Math.pow(d.i, 2)*d.r*d.t, sym:'Q', unit:'Дж'}) },
    { id:'cap', category:'electric', title:'Емкость конд.', latex:'C = Q / U', vars:[{symbol:'q', label:'Заряд Q'}, {symbol:'u', label:'Напряж. U'}], solve: d => ({res:d.q/d.u, sym:'C', unit:'Ф'}) },

    // МАГНЕТИЗМ
    { id:'ampere', category:'mag', title:'Сила Ампера', latex:'F_A = BIl \\sin \\alpha', vars:[{symbol:'b', label:'B'}, {symbol:'i', label:'I'}, {symbol:'l', label:'l'}, {symbol:'sin', label:'sin α'}], solve: d => ({res:d.b*d.i*d.l*d.sin, sym:'F_A', unit:'Н'}) },
    { id:'lorentz', category:'mag', title:'Сила Лоренца', latex:'F_L = qvB \\sin \\alpha', vars:[{symbol:'q', label:'q'}, {symbol:'v', label:'v'}, {symbol:'b', label:'B'}, {symbol:'sin', label:'sin α'}], solve: d => ({res:d.q*d.v*d.b*d.sin, sym:'F_L', unit:'Н'}) },
    { id:'mag_flux', category:'mag', title:'Магнитный поток', latex:'\\Phi = BS \\cos \\alpha', vars:[{symbol:'b', label:'B'}, {symbol:'s', label:'S'}, {symbol:'cos', label:'cos α'}], solve: d => ({res:d.b*d.s*d.cos, sym:'Φ', unit:'Вб'}) },
    { id:'ind_en', category:'mag', title:'Энергия катушки', latex:'W = LI^2 / 2', vars:[{symbol:'lind', label:'L'}, {symbol:'i', label:'I'}], solve: d => ({res:0.5*d.lind*Math.pow(d.i, 2), sym:'W', unit:'Дж'}) },

    // ОПТИКА И ВОЛНЫ
    { id:'lens', category:'waves', title:'Формула линзы', latex:'1/F = 1/d + 1/f', vars:[{symbol:'d', label:'Расст. до предм.'}, {symbol:'f', label:'Расст. до изобр.'}], solve: d => ({res:1/(1/d + 1/f), sym:'F', unit:'м'}) },
    { id:'opt_p', category:'waves', title:'Оптическая сила', latex:'D = 1/F', vars:[{symbol:'fdist', label:'Фокус F'}], solve: d => ({res:1/d.fdist, sym:'D', unit:'дптр'}) },
    { id:'thomson', category:'waves', title:'Формула Томсона', latex:'T = 2\\pi \\sqrt{LC}', vars:[{symbol:'l', label:'L'}, {symbol:'c', label:'C'}], solve: d => ({res:2*Math.PI*Math.sqrt(d.l*d.c), sym:'T', unit:'с'}) },

    // ЯДЕРНАЯ ФИЗИКА
    { id:'einstein', category:'quantum', title:'Энергия покоя', latex:'E = mc^2', vars:[{symbol:'m', label:'Масса'}], solve: d => ({res:d.m*Math.pow(299792458, 2), sym:'E', unit:'Дж'}) },
    { id:'mass_def', category:'quantum', title:'Дефект массы', latex:'\\Delta m = (Zm_p + Nm_n) - M_я', vars:[{symbol:'z', label:'Z (Протоны)'}, {symbol:'n', label:'N (Нейтроны)'}, {symbol:'mya', label:'M ядра'}], solve: d => ({res:(d.z*1.6726e-27 + d.n*1.6749e-27) - d.mya, sym:'Δm', unit:'кг'}) },
    { id:'bind_en', category:'quantum', title:'Энергия связи', latex:'E_{св} = \\Delta m c^2', vars:[{symbol:'dm', label:'Δm (кг)'}], solve: d => ({res:d.dm*Math.pow(299792458, 2), sym:'E_{св}', unit:'Дж'}) },
    { id:'decay', category:'quantum', title:'Закон распада', latex:'N = N_0 2^{-t/T}', vars:[{symbol:'n0', label:'N₀'}, {symbol:'t', label:'t'}, {symbol:'tp', label:'Период T'}], solve: d => ({res: d.n0 * Math.pow(2, -(d.t/d.tp)), sym:'N', unit:'ед'}) }
];

const constants = [
    { name: "Скорость света", val: "299 792 458 м/с", sym: "c" },
    { name: "Гравитационная", val: "6.674 × 10⁻¹¹", sym: "G" },
    { name: "Ускорение своб. пад.", val: "9.80665 м/с²", sym: "g" },
    { name: "Постоянная Планка", val: "6.626 × 10⁻³⁴", sym: "h" },
    { name: "Заряд электрона", val: "1.602 × 10⁻¹⁹ Кл", sym: "e" },
    { name: "Число Авогадро", val: "6.022 × 10²³ моль⁻¹", sym: "Nₐ" },
    { name: "Газовая постоянная", val: "8.314 Дж/(моль·К)", sym: "R" }
];

window.copyToClipboard = function(text) {
    const numericValue = text.replace(/[^0-9.eE-]/g, ''); // Извлекаем только число
    navigator.clipboard.writeText(numericValue).then(() => {
        alert('Значение скопировано: ' + numericValue);
    });
};

function initConstants() {
    const container = document.getElementById('constants-injected');
    if (!container) return;
    container.innerHTML = constants.map(c => `
        <div class="constant-card group cursor-pointer" onclick="copyToClipboard('${c.val}')">
            <div class="flex justify-between items-start">
                <div class="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">${c.name}</div>
                <svg class="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">${c.sym}</div>
            <div class="text-sm font-mono text-zinc-400 mt-3 opacity-80">${c.val}</div>
        </div>
    `).join('');
}

function initConverter() {
    const container = document.getElementById('converter-content');
    if (!container) return;
    container.innerHTML = `
        <div class="space-y-4">
            <select id="conv-type" class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500">
                <option value="length">Длина (м ↔ км ↔ см)</option>
                <option value="mass">Масса (кг ↔ г ↔ т)</option>
                <option value="temp">Температура (C ↔ K)</option>
            </select>
            <input type="number" id="conv-input" placeholder="Введите значение" class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500">
            <div id="conv-result" class="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 font-bold text-center">
                Результат появится здесь
            </div>
        </div>
    `;

    // Добавляем обработчик события для расчета
    document.getElementById('conv-input').addEventListener('input', runConversion);
    document.getElementById('conv-type').addEventListener('change', runConversion);
}

function runConversion() {
    const val = parseFloat(document.getElementById('conv-input').value) || 0;
    const type = document.getElementById('conv-type').value;
    const resBox = document.getElementById('conv-result');

    if (type === 'length') resBox.innerText = `${val} м = ${val/1000} км = ${val*100} см`;
    if (type === 'mass') resBox.innerText = `${val} кг = ${val*1000} г = ${val/1000} т`;
    if (type === 'temp') resBox.innerText = `${val} °C = ${val + 273.15} K`;
}

let activeFormula = null;
let myChart = null;

// Инициализация при загрузке
window.onload = () => {
    loadCustomFormulas(); // Загружаем то, что добавил админ
    renderFeed();
    initConstants();
    initConverter();
};

function loadCustomFormulas() {
    const localData = JSON.parse(localStorage.getItem('custom_formulas') || '[]');
    localData.forEach(f => {
        // Превращаем строку solveString обратно в рабочую функцию
        f.solve = new Function('d', `return { res: (${f.solveString}), sym: '${f.id}', unit: '${f.unit}' }`);
        formulas.push(f);
    });
}

// Рендеринг карточек на главной
function renderFeed() {
    const feed = document.getElementById('feed');
    if (!feed) return;
    feed.innerHTML = '';

    formulas.forEach((f) => {
        const card = document.createElement('div');
        card.className = "formula-card";
        card.dataset.category = f.category;
        card.innerHTML = `
            <div class="latex-container scale-110"></div>
            <h3>${f.title}</h3>
        `;
        card.onclick = () => openSolver(f);
        feed.appendChild(card);

        katex.render(f.latex, card.querySelector('.latex-container'), {
            color: '#ffffff',
            throwOnError: false,
            strict: false
        });
    });
}

// Открытие панели решения
window.openSolver = function(f) {
    activeFormula = f;
    document.getElementById('solver-panel').classList.add('active');
    document.getElementById('overlay').classList.remove('hidden');
    document.getElementById('solver-title').innerText = f.title;

    katex.render(f.latex, document.getElementById('solver-latex'), { color: '#ffffff' });

    const container = document.getElementById('inputs-container');
    container.innerHTML = '';

    // Генерируем поля ввода, используя 'symbol' как ключ
    f.vars.forEach(v => {
        container.innerHTML += `
            <div class="space-y-2">
                <label class="text-[10px] font-bold text-zinc-500 uppercase ml-2">${v.label}</label>
                <input type="number" step="any" data-key="${v.symbol}" oninput="calculate()"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 transition-all text-xl font-medium">
            </div>`;
    });

    document.getElementById('result-display').innerText = "0.00";
    updateChart(0);
};

// Главная функция расчета
window.calculate = function() {
    if (!activeFormula) return;

    const data = {};
    const inputs = document.querySelectorAll('#inputs-container input');

    inputs.forEach(input => {
        const key = input.dataset.key; // Берем ключ из data-key (s, t, m и т.д.)
        data[key] = parseFloat(input.value) || 0;
    });

    try {
        const result = activeFormula.solve(data);
        const display = document.getElementById('result-display');

        // Извлекаем числовое значение (учитываем твой формат {res: ...})
        let finalValue = (typeof result === 'object') ? result.res : result;
        let unit = (typeof result === 'object') ? result.unit : "";

        if (isNaN(finalValue) || !isFinite(finalValue)) {
            display.innerText = "0.00";
            updateChart(0);
        } else {
            // Выводим число и единицу измерения
            display.innerHTML = `${finalValue.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} <span class="text-2xl opacity-40">${unit}</span>`;
            updateChart(finalValue);
        }
    } catch (e) {
        console.error("Ошибка расчета:", e);
    }
};

// Отрисовка графика (Chart.js)
function updateChart(v) {
    const canvas = document.getElementById('formulaChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (myChart) myChart.destroy();

    // Генерируем 10 точек для наглядности
    let chartData = [];
    for (let i = 0; i <= 10; i++) {
        chartData.push(v * (i / 10) * (Math.random() * 0.2 + 0.9)); // Небольшая девиация для красоты
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(11).fill(''),
            datasets: [{
                data: chartData,
                borderColor: '#6366f1',
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
                backgroundColor: 'rgba(99,102,241,0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 600 },
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false, beginAtZero: true }
            }
        }
    });
}

// Закрытие панелей
window.closePanel = function() {
    document.getElementById('solver-panel').classList.remove('active');
    document.getElementById('overlay').classList.add('hidden');
};

window.filterFormulas = function(category) {
    // 1. Обновляем визуальное состояние кнопок
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        // Если текст или атрибут onclick совпадает с категорией, подсвечиваем
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        }
    });

    // 2. Фильтруем карточки формул
    const cards = document.querySelectorAll('.formula-card');

    cards.forEach(card => {
        const cardCategory = card.dataset.category;

        // Логика отображения
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex'; // Показываем
            // Можно добавить анимацию появления
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.display = 'none'; // Скрываем
        }
    });

    console.log(`Фильтр применен: ${category}`); // Для отладки в консоли
};

window.closeAll = function() {
    console.log("Закрытие всех окон...");

    // Список всех возможных модалок по ID
    const elementsToHide = [
        'admin-auth-modal',
        'admin-dashboard',
        'nuclear-balancer-modal',
        'unit-converter-modal',
        'overlay'
    ];

    elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Убираем активные классы панелей
    document.getElementById('solver-panel')?.classList.remove('active');
    document.getElementById('periodic-panel')?.classList.add('translate-y-full');

    activeFormula = null;
};

// --- ФУНКЦИИ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН ---

window.toggleNuclearBalancer = function() {
    const modal = document.getElementById('nuclear-balancer-modal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden', modal.classList.contains('hidden'));
    }
};

window.toggleConverter = function() {
    const modal = document.getElementById('unit-converter-modal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.classList.toggle('hidden');
        overlay.classList.toggle('hidden', modal.classList.contains('hidden'));
        // Если в конвертере есть функция инициализации, вызываем её здесь
        if (typeof initConverter === 'function') initConverter();
    }
};

window.togglePeriodic = function() {
    const panel = document.getElementById('periodic-panel');
    if (panel) {
        panel.classList.toggle('translate-y-full');
        // Оверлей для констант обычно не нужен, если панель выезжает снизу,
        // но если нужен — раскомментируйте строку ниже:
        // document.getElementById('overlay').classList.toggle('hidden', panel.classList.contains('translate-y-full'));
    }
};

// Исправленная функция закрытия всего
window.closeAll = function() {
    console.log("Закрытие всех окон...");

    // Список всех возможных модалок по ID
    const elementsToHide = [
        'admin-auth-modal',
        'admin-dashboard',
        'nuclear-balancer-modal',
        'unit-converter-modal',
        'overlay'
    ];

    elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Убираем активные классы панелей
    document.getElementById('solver-panel')?.classList.remove('active');
    document.getElementById('periodic-panel')?.classList.add('translate-y-full');

    activeFormula = null;
};

let adminClickSequence = [];
const secretCode = ['e', 'e', 'g', 'g', 'c', 'c'];

function initConstants() {
    const container = document.getElementById('constants-injected');
    if (!container) return;
    container.innerHTML = constants.map(c => `
        <div class="constant-card group" onclick="checkAdminSequence('${c.sym}')">
            <div class="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">${c.name}</div>
            <div class="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">${c.sym}</div>
            <div class="text-sm font-mono text-zinc-400 mt-3 opacity-80">${c.val}</div>
        </div>
    `).join('');
}

window.checkAdminSequence = function(sym) {
    // Очищаем символ от лишних знаков (если в массиве 'c', а приходит 'c')
    const cleanSym = sym.toLowerCase().trim();
    adminClickSequence.push(cleanSym);

    // Держим в массиве только последние 6 нажатий
    if (adminClickSequence.length > 6) {
        adminClickSequence.shift();
    }

    // Проверяем совпадение с кодом
    if (JSON.stringify(adminClickSequence) === JSON.stringify(secretCode)) {
        adminClickSequence = []; // Сбрасываем код
        openAdminModal();
    }
};

function openAdminModal() {
    const modal = document.getElementById('admin-auth-modal');
    const overlay = document.getElementById('overlay');
    if (modal) {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        // Добавим легкий звуковой сигнал или вибрацию для фидбека (опционально)
        if (window.navigator.vibrate) window.navigator.vibrate(50);
        console.log("Admin mode activated");
    }
}

window.loginAdmin = function() {
    const passInput = document.getElementById('admin-pass');
    if (passInput.value === '5182') {
        document.getElementById('admin-auth-modal').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
    } else {
        alert('Доступ запрещен');
    }
};

window.addNewFormula = function() {
    const id = document.getElementById('new-id').value;
    const cat = document.getElementById('new-cat').value;
    const title = document.getElementById('new-title').value;
    const latex = document.getElementById('new-latex').value;
    const unit = document.getElementById('new-unit').value;
    const solveRaw = document.getElementById('new-solve').value;
    const varsRaw = document.getElementById('new-vars').value;

    if(!id || !title || !solveRaw) {
        alert("Заполните основные поля!");
        return;
    }

    const vars = varsRaw.split(',').map(pair => {
        const [symbol, label] = pair.split('=').map(s => s.trim());
        return { symbol, label };
    });

    const newFormula = {
        id: id,
        category: cat,
        title: title,
        latex: latex,
        vars: vars,
        solveString: solveRaw, // Сохраняем строку для восстановления после перезагрузки
        unit: unit
    };

    // Добавляем в локальный массив
    saveFormulaToLocal(newFormula);

    // Очистка и закрытие
    window.closeAll();
    renderFeed();
};

function saveFormulaToLocal(formula) {
    let localData = JSON.parse(localStorage.getItem('custom_formulas') || '[]');
    localData.push(formula);
    localStorage.setItem('custom_formulas', JSON.stringify(localData));
}