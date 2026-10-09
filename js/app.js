(function () {
  'use strict';
  if (!window.SRNAuth.active()) return;
  const {cycles,finalGrade} = window.SRN;
  const container = document.getElementById('materias-container');
  const selector = document.getElementById('cycle');
  const formatDate = value => value.split('-').reverse().join('/');
  const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(',','.');
  document.getElementById('portal').hidden = false;
  selector.innerHTML = [...cycles].reverse().map(c=>`<option value="${c.id}">${escape(c.label)}</option>`).join('');
  let stored;
  try { stored = sessionStorage.getItem('srn-demo-cycle'); } catch (_) {}
  selector.value = cycles.some(c=>c.id===stored) ? stored : '6';
  function filterTable(subject) {
    const filters = [...subject.querySelectorAll('.filter-input')].map(input=>normalize(input.value));
    let visible = 0;
    subject.querySelectorAll('tbody tr[data-evaluation]').forEach(row=>{
      row.hidden = !filters.every((filter,i)=>normalize(row.cells[i].textContent).includes(filter));
      if (!row.hidden) visible++;
    });
    subject.querySelector('.empty-row').hidden = visible > 0;
    subject.querySelector('.row-count').textContent = `${visible} de ${subject.querySelectorAll('[data-evaluation]').length} evaluaciones`;
  }
  function render() {
    const cycle = cycles.find(c=>c.id===selector.value) || cycles[5];
    const uv = cycle.subjects.reduce((sum,s)=>sum+s.uv,0);
    const average = cycle.subjects.reduce((sum,s)=>sum+finalGrade(s)*s.uv,0)/uv;
    document.getElementById('cycle-summary').textContent = `Ciclo ${cycle.roman} · 0${cycle.period}/${cycle.year} · ${cycle.subjects.length} materias · ${uv} UV · Promedio ponderado: ${average.toFixed(2)}`;
    container.innerHTML = cycle.subjects.map(subject=>`<article class="subject" aria-label="${escape(subject.name)}">
      <div class="subject-header"><dl><dt>Profesor:</dt><dd>${escape(subject.teacher)}</dd><dt>Materia:</dt><dd>${subject.code ? subject.code+' ' : ''}${escape(subject.name.toLocaleUpperCase('es'))} &nbsp; - &nbsp; Sección ${subject.section}</dd><dt></dt><dd class="details">${subject.uv} unidades valorativas · Ciclo ${cycle.roman}</dd></dl></div>
      <div class="panel"><button type="button" class="panel-heading" aria-expanded="true" aria-controls="${subject.id}"><span>Evaluaciones de la asignatura-sección</span><span class="chevron" aria-hidden="true">⌃</span></button>
      <div class="panel-body" id="${subject.id}"><div class="table-responsive"><table class="table-notas"><caption class="sr-only">Evaluaciones de ${escape(subject.name)}</caption><thead><tr>${['Evaluación','Ponderación (%)','Fecha realización','Nota'].map(label=>`<th scope="col">${label}</th>`).join('')}</tr><tr class="filter-row">${['evaluación','ponderación','fecha','nota'].map(label=>`<td><div class="filter-control"><input class="filter-input" type="text" aria-label="Filtrar por ${label} en ${escape(subject.name)}"><button type="button" class="clear-filter" aria-label="Limpiar filtro de ${label}">×</button></div></td>`).join('')}</tr></thead><tbody>
      ${subject.evaluations.map(e=>`<tr data-evaluation><td>${escape(e.name)}</td><td>${e.weight.toFixed(1)}</td><td>${formatDate(e.date)}</td><td>${e.grade.toFixed(2)}</td></tr>`).join('')}
      <tr class="empty-row" hidden><td colspan="4" class="empty">No hay evaluaciones que coincidan con los filtros.</td></tr></tbody><tfoot><tr><td colspan="2"></td><td>Nota final:</td><td>${finalGrade(subject).toFixed(2)}</td></tr></tfoot></table></div>
      <div class="actions"><button class="reset-table" type="button" aria-label="Restablecer filtros de ${escape(subject.name)}" title="Restablecer filtros de esta tabla">⟳</button><button class="reset-cycle" type="button" aria-label="Restablecer todas las tablas del ciclo" title="Restablecer todas las tablas del ciclo">⟳</button><small class="row-count">${subject.evaluations.length} de ${subject.evaluations.length} evaluaciones</small></div></div></div></article>`).join('');
  }
  selector.addEventListener('change',()=>{
    try { sessionStorage.setItem('srn-demo-cycle',selector.value); } catch (_) {}
    render();
  });
  container.addEventListener('input',event=>{
    if (event.target.matches('.filter-input')) filterTable(event.target.closest('.subject'));
  });
  container.addEventListener('click',event=>{
    const button = event.target.closest('button');
    if (!button) return;
    const subject = button.closest('.subject');
    if (button.matches('.panel-heading')) {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded',String(!expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
      button.querySelector('.chevron').textContent = expanded ? '⌄' : '⌃';
    } else if (button.matches('.clear-filter')) {
      const input = button.previousElementSibling;
      input.value = ''; filterTable(subject); input.focus();
    } else if (button.matches('.reset-table')) {
      subject.querySelectorAll('.filter-input').forEach(input=>{input.value='';}); filterTable(subject);
    } else if (button.matches('.reset-cycle')) { render(); }
  });
  function showView() {
    const requested = location.hash.slice(1);
    const view = ['home','grades','help'].includes(requested) ? requested : 'home';
    ['home','grades','help'].forEach(name=>{document.getElementById(`${name}-view`).hidden = name !== view;});
    document.querySelectorAll('.subnav [data-view]').forEach(button=>{
      if (button.dataset.view === view) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
    document.getElementById('crumb').textContent = view === 'home' ? '' : `  ›  ${view === 'grades' ? 'Consulta de notas  ›  Consultar notas' : 'Ayuda'}`;
  }
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{location.hash=button.dataset.view;}));
  document.getElementById('logout').addEventListener('click',()=>window.SRNAuth.logout());
  document.getElementById('print').addEventListener('click',()=>window.print());
  window.addEventListener('hashchange',showView);
  render(); showView();
})();
