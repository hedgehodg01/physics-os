const formulas = [
    // --- МЕХАНИКА И ГИДРОСТАТИКА ---
    { id:'dens', category:'mechanics', title:'Плотность', latex:'\\rho = m / V', vars:[{symbol:'ro', label:'Плотность', units:{'кг/м³':1, 'г/см³':1000}}, {symbol:'m', label:'Масса', units:{'кг':1, 'г':0.001}}, {symbol:'v', label:'Объем', units:{'м³':1, 'л':0.001}}], solve: d => d.ro===null ? {res:d.m/d.v, sym:'ρ', unit:'кг/м³'} : d.m===null ? {res:d.ro*d.v, sym:'m', unit:'кг'} : {res:d.m/d.ro, sym:'V', unit:'м³'} },
    { id:'pres', category:'hydro', title:'Давление жидкости', latex:'P = \\rho g h', vars:[{symbol:'ro', label:'Плотность', units:{'кг/м³':1}}, {symbol:'h', label:'Глубина', units:{'м':1}}], solve: d => ({res:d.ro*9.81*d.h, sym:'P', unit:'Па'}) },
    { id:'arch', category:'hydro', title:'Сила Архимеда', latex:'F_A = \\rho g V', vars:[{symbol:'ro', label:'Плотн. жидк.', units:{'кг/м³':1}}, {symbol:'v', label:'Объем тела', units:{'м³':1}}], solve: d => ({res:d.ro*9.81*d.v, sym:'Fa', unit:'Н'}) },
    { id:'f_newton', category:'mechanics', title:'Закон Ньютона II', latex:'F = m a', vars:[{symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'a', label:'Ускорение', units:{'м/с²':1}}], solve: d => ({res:d.m*d.a, sym:'F', unit:'Н'}) },
    { id:'f_fric', category:'mechanics', title:'Сила трения', latex:'F_{тр} = \\mu N', vars:[{symbol:'mu', label:'Коэф. μ', units:{'ед':1}}, {symbol:'n', label:'Реакция N', units:{'Н':1}}], solve: d => ({res:d.mu*d.n, sym:'Fтр', unit:'Н'}) },

    // --- РАБОТА И ЭНЕРГИЯ ---
    { id:'work', category:'mechanics', title:'Работа', latex:'A = F S', vars:[{symbol:'f', label:'Сила', units:{'Н':1}}, {symbol:'s', label:'Путь', units:{'м':1}}], solve: d => ({res:d.f*d.s, sym:'A', unit:'Дж'}) },
    { id:'ekin', category:'mechanics', title:'Кин. энергия', latex:'E_k = \\frac{mv^2}{2}', vars:[{symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'v', label:'Скорость', units:{'м/с':1}}], solve: d => ({res:0.5*d.m*d.v*d.v, sym:'Ek', unit:'Дж'}) },
    { id:'eff', category:'mechanics', title:'КПД (%)', latex:'\\eta = (A_п / A_з) \\cdot 100', vars:[{symbol:'ap', label:'Полезная А', units:{'Дж':1}}, {symbol:'az', label:'Затрат. А', units:{'Дж':1}}], solve: d => ({res:(d.ap/d.az)*100, sym:'η', unit:'%'}) },

    // --- ТЕПЛОТА ---
    { id:'q_heat', category:'heat', title:'Нагревание', latex:'Q = cm\\Delta t', vars:[{symbol:'c', label:'Теплоемк.', units:{'Дж/кг°C':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}, {symbol:'dt', label:'Δt', units:{'°C':1}}], solve: d => ({res:d.c*d.m*d.dt, sym:'Q', unit:'Дж'}) },
    { id:'q_melt', category:'heat', title:'Плавление', latex:'Q = \\lambda m', vars:[{symbol:'l', label:'Уд. тепл. λ', units:{'Дж/кг':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}], solve: d => ({res:d.l*d.m, sym:'Q', unit:'Дж'}) },
    { id:'q_vap', category:'heat', title:'Парообразование', latex:'Q = L m', vars:[{symbol:'l', label:'Уд. тепл. L', units:{'Дж/кг':1}}, {symbol:'m', label:'Масса', units:{'кг':1}}], solve: d => ({res:d.l*d.m, sym:'Q', unit:'Дж'}) },

    // --- ЭЛЕКТРИЧЕСТВО ---
    { id:'ohm', category:'electric', title:'Закон Ома', latex:'I = U / R', vars:[{symbol:'u', label:'Напряж. U', units:{'В':1}}, {symbol:'r', label:'Сопротив. R', units:{'Ом':1}}], solve: d => ({res:d.u/d.r, sym:'I', unit:'А'}) },
    { id:'pow_el', category:'electric', title:'Мощность тока', latex:'P = UI', vars:[{symbol:'u', label:'Напряж. U', units:{'В':1}}, {symbol:'i', label:'Ток I', units:{'А':1}}], solve: d => ({res:d.u*d.i, sym:'P', unit:'Вт'}) },

    // --- ОПТИКА ---

    { id:'lens', category:'optics', title:'Тонкая линза', latex:'\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}', vars:[{symbol:'f_dist', label:'До изобр. f', units:{'м':1}}, {symbol:'d_dist', label:'До объекта d', units:{'м':1}}], solve: d => ({res:1/(1/d.f_dist + 1/d.d_dist), sym:'F', unit:'м'}) },

    { id:'snell', category:'optics', title:'Закон Снеллиуса', latex:'n_1 \\sin \\alpha = n_2 \\sin \\beta', vars:[{symbol:'n1', label:'n1', units:{'ед':1}}, {symbol:'a', label:'Угол падения', units:{'deg':1}}, {symbol:'n2', label:'n2', units:{'ед':1}}], solve: d => ({res:Math.asin((d.n1*Math.sin(d.a*Math.PI/180))/d.n2)*180/Math.PI, sym:'β', unit:'°'}) },

    // --- КВАНТЫ ---
    { id:'photon', category:'quantum', title:'Энергия фотона', latex:'E = h \\nu', vars:[{symbol:'n', label:'Частота ν', units:{'Гц':1, 'ТГц':1e12}}], solve: d => ({res:6.626e-34*d.n, sym:'E', unit:'Дж'}) }
];

const constants = [
    { name: "Ускорение g", val: 9.81 }, { name: "Скорость света c", val: 3e8 },
    { name: "Пост. Планка h", val: 6.62e-34 }, { name: "Газовая пост. R", val: 8.31 }
];

const elements = [
    { s:'n', z:0, a:1 }, { s:'p', z:1, a:1 }, { s:'α', z:2, a:4 }, { s:'He', z:2, a:4 }, { s:'U', z:92, a:238 }
];

let activeFormula = null, multipliers = {}, myChart = null;

window.onload = () => { renderFeed(); renderConstants(); renderPeriodic(); };

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
        group.querySelector('select').onchange = (e) => { multipliers[v.symbol] = parseFloat(e.target.value); updateResult(); };
        container.appendChild(group);
    });
    document.getElementById('solver-panel').classList.add('active');
    document.getElementById('overlay').classList.remove('hidden');
}

function updateResult() {
    const data = {};
    activeFormula.vars.forEach(v => {
        const val = document.querySelector(`input[data-sym="${v.symbol}"]`).value;
        data[v.symbol] = val === "" ? null : parseFloat(val) * multipliers[v.symbol];
    });
    const sol = activeFormula.solve(data);
    if(sol && !isNaN(sol.res)) {
        document.getElementById('result-display').innerText = sol.res.toPrecision(5);
        document.getElementById('result-label').innerText = `Результат: ${sol.sym} (${sol.unit})`;
        updateChart(sol.res);
    }
}

function updateChart(val) {
    const ctx = document.getElementById('formulaChart').getContext('2d');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, { type:'line', data:{ labels:['0','25%','50%','75%','100%'], datasets:[{data:[0, val*0.4, val*0.7, val*0.9, val], borderColor:'#6366f1', tension:0.4, fill:true, backgroundColor:'rgba(99,102,241,0.05)'}] }, options:{plugins:{legend:{display:false}}, scales:{y:{display:false},x:{grid:{display:false}}}} });
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
        d.onclick = () => {
            const i = document.querySelector('#inputs-container input');
            if(i) { i.value = c.val; i.dispatchEvent(new Event('input')); }
        };
        container.appendChild(d);
    });
}

function renderPeriodic() {
    const grid = document.getElementById('periodic-grid');
    elements.forEach(el => {
        const d = document.createElement('div'); d.className = "bg-white/5 p-3 rounded-xl text-center cursor-pointer border border-white/5 hover:border-indigo-500";
        d.innerHTML = `<div class="text-[9px] text-zinc-500">${el.z}</div><div class="font-black text-white">${el.s}</div><div class="text-[9px] text-indigo-400">${el.a}</div>`;
        d.onclick = () => {
            const i = document.querySelector('#inputs-container input');
            if(i) { i.value = el.a; i.dispatchEvent(new Event('input')); }
        };
        grid.appendChild(d);
    });
}

function toggleConstants() { document.getElementById('constants-list').classList.toggle('hidden'); }
function togglePeriodic() { document.getElementById('periodic-panel').classList.toggle('translate-y-full'); }
function closePanel() { document.getElementById('solver-panel').classList.remove('active'); document.getElementById('overlay').classList.add('hidden'); }
function filterFormulas(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.innerText.toLowerCase().includes(cat) || (cat==='all' && b.innerText==='ВСЕ')));
    document.querySelectorAll('.formula-card').forEach(c => c.style.display = (cat==='all' || c.dataset.category===cat) ? 'flex' : 'none');
}
function openNuclearBalancer() { document.getElementById('nuclear-modal').classList.remove('opacity-0', 'pointer-events-none'); }
function closeNuclear() { document.getElementById('nuclear-modal').classList.add('opacity-0', 'pointer-events-none'); }
function closeAll() { closePanel(); closeNuclear(); }