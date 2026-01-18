/** * Physics OS Ultimate Core - Full Version
 * Protected & Optimized for GitHub Pages
 */

const _SYMBOLS = { ro: 'density', c: 'capacity', l: 'melt', v_heat: 'vap', tm: 'tMelt' };

// 1. ПОЛНАЯ БАЗА МАТЕРИАЛОВ
const materials = [
    { name: "Вода", density: 1000, capacity: 4200, melt: 334000, vap: 2260000, tMelt: 0 },
    { name: "Лёд", density: 900, capacity: 2100, melt: 334000, tMelt: 0 },
    { name: "Сталь", density: 7800, capacity: 460, melt: 270000, tMelt: 1500 },
    { name: "Алюминий", density: 2700, capacity: 920, melt: 390000, tMelt: 660 },
    { name: "Золото", density: 19300, capacity: 130, melt: 67000, tMelt: 1064 },
    { name: "Ртуть", density: 13600, capacity: 140, melt: 12000, tMelt: -39 },
    { name: "Медь", density: 8900, capacity: 385, melt: 210000, tMelt: 1085 },
    { name: "Спирт", density: 800, capacity: 2400, melt: 108000, vap: 846000, tMelt: -114 },
    { name: "Свинец", density: 11340, capacity: 130, melt: 25000, tMelt: 327 },
    { name: "Воздух", density: 1.29, capacity: 1000, melt: 0, tMelt: -213 }
];

// 2. ТАБЛИЦА ИЗОТОПОВ
const elements = [
    { s:'n', z:0, a:1 }, { s:'p', z:1, a:1 }, { s:'α', z:2, a:4 }, { s:'Li', z:3, a:7 }, 
    { s:'Be', z:4, a:9 }, { s:'C', z:6, a:12 }, { s:'N', z:7, a:14 }, { s:'O', z:8, a:16 }, { s:'U', z:92, a:238 }
];

// 3. ПОЛНЫЙ СПИСОК ФОРМУЛ (ВСЕ РАЗДЕЛЫ)
const formulas = [
    // Механика и Кинематика
    { id:'speed', category:'mechanics', title:'Скорость', latex:'v = S / t', vars:[{symbol:'s', label:'Путь (S)', units:{'м':1}}, {symbol:'t', label:'Время (t)', units:{'с':1}}], solve: d => ({res:d.s/d.t, sym:'v', unit:'м/с'}) },
    { id:'accel', category:'mechanics', title:'Ускорение', latex:'a = \\frac{v - v_0}{t}', vars:[{symbol:'v', label:'v кон', units:{'м/с':1}}, {symbol:'v0', label:'v нач', units:{'м/с':1}}, {symbol:'t', label:'Время', units:{'с':1}}], solve: d => ({res:(d.v-d.v0)/d.t, sym:'a', unit:'м/с²'}) },
    { id:'f_newton', category:'mechanics', title:'Закон Ньютона II', latex:'F = m a', vars:[{symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'a', label:'Ускорение', units:{'м/с²':1}}], solve: d => ({res:d.m*d.a, sym:'F', unit:'Н'}) },
    { id:'grav', category:'mechanics', title:'Всемирное тяготение', latex:'F = G \\frac{m_1 m_2}{r^2}', vars:[{symbol:'m1', label:'Масса 1', units:{'кг':1}}, {symbol:'m2', label:'Масса 2', units:{'кг':1}}, {symbol:'r', label:'Расстояние', units:{'м':1}}], solve: d => ({res:6.67e-11*(d.m1*d.m2)/(d.r**2), sym:'F', unit:'Н'}) },
    { id:'dens', category:'mechanics', title:'Плотность', latex:'\\rho = m / V', vars:[{symbol:'ro', label:'Плотность', units:{'кг/м³':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'v', label:'Объем', units:{'м³':1}}], solve: d => d.ro===null ? {res:d.m/d.v, sym:'ρ', unit:'кг/м³'} : d.m===null ? {res:d.ro*d.v, sym:'m', unit:'кг'} : {res:d.m/d.ro, sym:'V', unit:'м³'} },
    
    // Гидростатика
    { id:'pres', category:'hydro', title:'Давление жидкости', latex:'P = \\rho g h', vars:[{symbol:'ro', label:'Плотность', units:{'кг/м³':1}}, {symbol:'h', label:'Глубина', units:{'м':1}}], solve: d => ({res:d.ro*9.81*d.h, sym:'P', unit:'Па'}) },
    { id:'arch', category:'hydro', title:'Сила Архимеда', latex:'F_A = \\rho g V', vars:[{symbol:'ro', label:'Плотн. жидк.', units:{'кг/м³':1}}, {symbol:'v', label:'Объем тела', units:{'м³':1}}], solve: d => ({res:d.ro*9.81*d.v, sym:'Fa', unit:'Н'}) },

    // Теплота
    { id:'q_heat', category:'heat', title:'Нагревание', latex:'Q = cm\\Delta t', vars:[{symbol:'c', label:'Уд. тепл. (c)', units:{'Дж/кг°C':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'dt', label:'Δt', units:{'°C':1}}], solve: d => ({res:d.c*d.m*d.dt, sym:'Q', unit:'Дж'}) },
    { id:'q_melt', category:'heat', title:'Плавление', latex:'Q = \\lambda m', vars:[{symbol:'l', label:'Уд. тепл. λ', units:{'Дж/кг':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'tm', label:'Т. плавл.', units:{'°C':1}}], solve: d => ({res:d.l*d.m, sym:'Q', unit:'Дж'}) },
    { id:'q_vap', category:'heat', title:'Парообразование', latex:'Q = L m', vars:[{symbol:'v_heat', label:'Уд. тепл. L', units:{'Дж/кг':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}], solve: d => ({res:d.v_heat*d.m, sym:'Q', unit:'Дж'}) },

    // Электричество
    { id:'ohm', category:'electric', title:'Закон Ома', latex:'I = U / R', vars:[{symbol:'u', label:'Напряж. U', units:{'В':1}}, {symbol:'r', label:'Сопротив. R', units:{'Ом':1}}], solve: d => ({res:d.u/d.r, sym:'I', unit:'А'}) },
    { id:'pow_el', category:'electric', title:'Мощность тока', latex:'P = UI', vars:[{symbol:'u', label:'Напряж. U', units:{'В':1}}, {symbol:'i', label:'Ток I', units:{'А':1}}], solve: d => ({res:d.u*d.i, sym:'P', unit:'Вт'}) },
    { id:'coulomb', category:'electric', title:'Закон Кулона', latex:'F = k \\frac{q_1 q_2}{r^2}', vars:[{symbol:'q1', label:'Заряд 1', units:{'Кл':1}}, {symbol:'q2', label:'Заряд 2', units:{'Кл':1}}, {symbol:'r', label:'Расстояние', units:{'м':1}}], solve: d => ({res:9e9*(d.q1*d.q2)/(d.r**2), sym:'F', unit:'Н'}) },

    // Оптика и Кванты
    { id:'lens', category:'optics', title:'Тонкая линза', latex:'\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}', vars:[{symbol:'f_dist', label:'До изобр. f', units:{'м':1}}, {symbol:'d_dist', label:'До объекта d', units:{'м':1}}], solve: d => ({res:1/(1/d.f_dist + 1/d.d_dist), sym:'F', unit:'м'}) },
    { id:'photon', category:'quantum', title:'Энергия фотона', latex:'E = h \\nu', vars:[{symbol:'n', label:'Частота ν', units:{'Гц':1}}], solve: d => ({res:6.626e-34*d.n, sym:'E', unit:'Дж'}) },
    { id:'einstein', category:'quantum', title:'Энергия (E=mc²)', latex:'E = mc^2', vars:[{symbol:'m', label:'Масса (m)', units:{'кг':1}}], solve: d => ({res:d.m * 9e16, sym:'E', unit:'Дж'}) }
];

// 4. КОНСТАНТЫ
const constants = [
    { name: "Ускорение g", val: 9.81 },
    { name: "Скорость света c", val: 3e8 },
    { name: "Грав. пост. G", val: 6.67e-11 },
    { name: "Пост. Планка h", val: 6.626e-34 }
];

let activeFormula = null, multipliers = {}, myChart = null;

// Инициализация системы
window.onload = () => { renderFeed(); renderConstants(); };

function renderFeed() {
    const feed = document.getElementById('feed'); feed.innerHTML = '';
    formulas.forEach(f => {
        const card = document.createElement('div');
        card.className = "formula-card"; card.dataset.category = f.category;
        card.innerHTML = `<div class="latex-v h-12 mb-2 flex items-center"></div><h3 class="text-[10px] font-bold uppercase text-zinc-500">${f.title}</h3>`;
        card.onclick = () => openSolver(f);
        feed.appendChild(card);
        katex.render(f.latex, card.querySelector('.latex-v'), { color: '#ffffff' });
    });
}

function openSolver(f) {
    activeFormula = f; multipliers = {};
    document.getElementById('solver-title').innerText = f.title;
    katex.render(f.latex, document.getElementById('solver-latex'), { displayMode: true, color: '#6366f1' });
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    f.vars.forEach(v => {
        multipliers[v.symbol] = Object.values(v.units)[0];
        const group = document.createElement('div');
        group.innerHTML = `<label class="text-[10px] text-zinc-500 uppercase font-black">${v.label}</label>
            <div class="flex gap-2 mt-1"><input type="number" inputmode="decimal" data-sym="${v.symbol}" class="flex-1 bg-white/10 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500 transition mono">
            <select class="bg-zinc-900 rounded-xl px-2 text-xs border border-white/10">${Object.keys(v.units).map(u=>`<option value="${v.units[u]}">${u}</option>`).join('')}</select></div>`;
        group.querySelector('input').oninput = updateResult;
        container.appendChild(group);
    });
    document.getElementById('solver-panel').classList.add('active');
    document.getElementById('overlay').classList.remove('hidden');
}

function renderMaterials() {
    document.getElementById('panel-title').innerText = "Свойства веществ";
    const grid = document.getElementById('periodic-grid'); grid.innerHTML = '';
    materials.forEach(m => {
        const d = document.createElement('div');
        d.className = "bg-white/5 p-4 rounded-xl text-center cursor-pointer border border-white/5 hover:border-indigo-500 transition";
        d.innerHTML = `<div class="text-white font-bold text-xs">${m.name}</div><div class="text-[9px] text-zinc-500 mt-1">ρ=${m.density} | t=${m.tMelt}°</div>`;
        d.onclick = () => {
            Object.keys(_SYMBOLS).forEach(key => fillInput(key, m[_SYMBOLS[key]]));
            togglePeriodic();
        };
        grid.appendChild(d);
    });
    if (document.getElementById('periodic-panel').classList.contains('translate-y-full')) togglePeriodic();
}

function renderIsotopes() {
    document.getElementById('panel-title').innerText = "Таблица ядер";
    const grid = document.getElementById('periodic-grid'); grid.innerHTML = '';
    elements.forEach(el => {
        const d = document.createElement('div');
        d.className = "bg-white/5 p-3 rounded-xl text-center cursor-pointer border border-white/5 hover:border-rose-500";
        d.innerHTML = `<div class="text-[9px] text-zinc-500">${el.z}</div><div class="font-black text-white">${el.s}</div><div class="text-[9px] text-rose-400">${el.a}</div>`;
        d.onclick = () => {
            const a1 = document.getElementById('nuc-a1'); const z1 = document.getElementById('nuc-z1');
            if (!a1.value) { a1.value = el.a; z1.value = el.z; } 
            else { document.getElementById('nuc-a2').value = el.a; document.getElementById('nuc-z2').value = el.z; }
            togglePeriodic();
        };
        grid.appendChild(d);
    });
    if (document.getElementById('periodic-panel').classList.contains('translate-y-full')) togglePeriodic();
}

function fillInput(s, v) {
    const i = document.querySelector(`input[data-sym="${s}"]`);
    if(i && v !== undefined) { i.value = v; i.dispatchEvent(new Event('input')); }
}

function updateResult() {
    const d = {};
    activeFormula.vars.forEach(v => {
        const val = document.querySelector(`input[data-sym="${v.symbol}"]`).value;
        d[v.symbol] = val === "" ? null : parseFloat(val) * multipliers[v.symbol];
    });
    const sol = activeFormula.solve(d);
    if(sol && !isNaN(sol.res)) {
        document.getElementById('result-display').innerText = sol.res.toPrecision(5);
        document.getElementById('result-label').innerText = `Результат: ${sol.sym} (${sol.unit})`;
        updateChart(sol.res);
    }
}

function updateChart(v) {
    const ctx = document.getElementById('formulaChart').getContext('2d');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, { type:'line', data:{ labels:['0','25','50','75','100'], datasets:[{data:[0, v*0.3, v*0.6, v*0.8, v], borderColor:'#6366f1', tension:0.4, fill:true, backgroundColor:'rgba(99,102,241,0.05)'}] }, options:{plugins:{legend:{display:false}}, scales:{y:{display:false},x:{grid:{display:false}}}} });
}

function balanceNuclear() {
    const a = (+document.getElementById('nuc-a1').value || 0) + (+document.getElementById('nuc-a2').value || 0);
    const z = (+document.getElementById('nuc-z1').value || 0) + (+document.getElementById('nuc-z2').value || 0);
    document.getElementById('res-a').innerText = a; document.getElementById('res-z').innerText = z;
    const el = elements.find(e => e.z === z); document.getElementById('res-sym').innerText = el ? el.s : '?';
}

function renderConstants() {
    const container = document.getElementById('constants-injected');
    constants.forEach(c => {
        const d = document.createElement('div'); d.className = 'flex justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer';
        d.innerHTML = `<span class="text-[10px] text-zinc-400">${c.name}</span><span class="text-indigo-400 font-mono text-[10px]">${c.val}</span>`;
        d.onclick = () => { const i = document.querySelector('#inputs-container input'); if(i){i.value=c.val; i.dispatchEvent(new Event('input'));} };
        container.appendChild(d);
    });
}

function toggleConstants() { document.getElementById('constants-list').classList.toggle('hidden'); }
function togglePeriodic() { document.getElementById('periodic-panel').classList.toggle('translate-y-full'); }
function closePanel() { document.getElementById('solver-panel').classList.remove('active'); document.getElementById('overlay').classList.add('hidden'); }
function filterFormulas(cat) { 
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.innerText.toLowerCase().includes(cat) || (cat==='all' && b.innerText==='Все')));
    document.querySelectorAll('.formula-card').forEach(c => c.style.display = (cat==='all' || c.dataset.category===cat) ? 'flex' : 'none'); 
}
function openNuclearBalancer() { document.getElementById('nuclear-modal').classList.remove('opacity-0', 'pointer-events-none'); }
function closeNuclear() { document.getElementById('nuclear-modal').classList.add('opacity-0', 'pointer-events-none'); }
function closeAll() { closePanel(); closeNuclear(); document.getElementById('periodic-panel').classList.add('translate-y-full'); }
