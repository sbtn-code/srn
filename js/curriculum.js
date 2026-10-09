/* Ingeniería Civil, Plan 2018. Nombres, códigos y UV del pénsum proporcionado.
   Incluye datos de las capturas proporcionadas y ejemplos para las materias restantes. */
(function (root) {
  'use strict';
  const plan = [
    [['010180','Precálculo',4],['','Optativa técnica I',3],['220132','Comunicación gráfica para el diseño en ingeniería',4],['','Optativa humanístico-social I',3]],
    [['010181','Cálculo I',4],['010112','Álgebra vectorial y matrices',4],['260061','Química general',5],['','Optativa humanístico-social II',3]],
    [['010182','Cálculo II',4],['200068','Física I',5],['200076','Ingeniería geológica',3],['210017','Estática',3],['190146','Programación y métodos numéricos',4]],
    [['010183','Cálculo III',4],['200069','Física II',5],['010184','Ecuaciones diferenciales',4],['210055','Mecánica de materiales',4],['','Optativa humanístico-social III',3]],
    [['200053','Mecánica de fluidos',4],['210114','Análisis estructural I',3],['210057','Materiales de construcción',4],['210013','Dinámica',3],['010118','Probabilidad y estadística',4]],
    [['260024','Ingeniería ambiental',5],['210115','Análisis estructural II',3],['210112','Ingeniería de construcción I',4],['210060','Ingeniería geotécnica',5],['210029','Topografía',4]]
  ];
  const teachers = ['MARIO ANDRÉS RIVERA LÓPEZ','ANA LUCÍA TORRES MÉNDEZ','CARLOS EDUARDO SALAZAR RIVAS','SOFÍA ISABEL CASTILLO REYES','DIEGO ALEJANDRO FLORES CRUZ','VALERIA BEATRIZ MORALES PINEDA','JOSÉ MANUEL VARGAS SOLÍS','ELENA PATRICIA NAVARRO DÍAZ'];
  const roman = ['I','II','III','IV','V','VI'];
  const schemes = [
    [['Examen Corto 1',15],['Primera Evaluación Parcial',20],['Segunda Evaluación Parcial',25],['Examen Corto 2',15],['Evaluación Final',25]],
    [['Primera Evaluación Parcial',20],['Laboratorio 1',15],['Segunda Evaluación Parcial',20],['Laboratorio 2',15],['Proyecto final',30]],
    [['Actividad práctica 1',15],['Primera Evaluación Parcial',25],['Actividad práctica 2',15],['Segunda Evaluación Parcial',25],['Trabajo final',20]]
  ];
  const cycles = plan.map((subjects, c) => {
    const year = 2024 + Math.floor(c / 2);
    const period = c % 2 + 1;
    return {id: String(c + 1), roman: roman[c], year, period,
      label: `0${period}/${year}-Pregrado UCA · Ciclo ${roman[c]}`,
      subjects: subjects.map(([code,name,uv], s) => ({
        id: `c${c+1}-m${s+1}`, code, name, uv,
        section: String(1 + (c+s)%5).padStart(2,'0'),
        teacher: teachers[(c*3+s)%teachers.length],
        evaluations: schemes[(c+s)%schemes.length].map(([name,weight], e) => {
          const date = new Date(Date.UTC(year, period === 1 ? 2 : 7, 10 + e*23 + s*2));
          const grade = (70 + ((c*17+s*11+e*7+s*e*3)%21))/10;
          return {name,weight,grade,date:date.toISOString().slice(0,10)};
        })
      }))};
  });
  // Datos de diez capturas, con docentes ficticios. Años completados según el
  // período de la malla; 2025 está visible en la captura de Estática.
  const references = [
    {id:'c2-m1', teacher:'ANA PATRICIA HERNÁNDEZ LÓPEZ',section:'02',reportedFinal:'8.00',rows:[
      ['Tarea grupal 1',5,'06/09',10],['Primera Evaluación Parcial',20,'14/09',7],
      ['Tarea grupal 2',5,'11/10',10],['Segunda Evaluación Parcial',25,'12/10',7.9],
      ['Taller métodos de prueba',15,'14/11',7],['Tarea grupal 3',5,'15/11',9.7],['Evaluación Final',25,'23/11',8]
    ]},
    {id:'c2-m3',teacher:'JOSÉ ROBERTO MARTÍNEZ PÉREZ',section:'02',reportedFinal:'8.4',rows:[
      ['Primera Evaluación Parcial',25,'27/09',8.05],['Segunda Evaluación Parcial',20,'01/11',8.10],
      ['Evaluación Final',25,'30/11',7.65],['Laboratorios Prácticos',30,'',9.43]
    ],labs:[['Laboratorio 1','12/09',8.60],['Laboratorio 2','26/09',10],['Laboratorio 3','24/10',9.60],['Laboratorio 4','07/11',9.50]]},
    {id:'c3-m4',teacher:'CARLOS ALBERTO LÓPEZ RAMÍREZ',section:'01',reportedFinal:'7.5',rows:[
      ['Primera Tarea',5,'02/04',6.75],['Primera Evaluación Parcial',20,'12/04',8.10],
      ['Segunda Tarea',5,'14/05',8.67],['Segunda Evaluación Parcial',25,'24/05',5.75],
      ['Tercera Tarea',5,'18/06',7.88],['Proyecto',15,'23/06',8.80],['Evaluación Final',25,'03/07',7.65]
    ]},
    {id:'c3-m2',teacher:'JORGE ENRIQUE GARCÍA FLORES',section:'01',reportedFinal:'8.0',rows:[
      ['Primera Evaluación Parcial',20,'03/05',6.43],['Segunda Evaluación Parcial',20,'07/06',6.15],
      ['Tarea',10,'11/06',10],['Prácticas de laboratorio',15,'18/06',8.62],['Discusión',10,'20/06',9.95],
      ['Conferencia de cátedra',5,'21/06',9.93],['Evaluación Final',20,'07/07',8.33]
    ]},
    {id:'c3-m5',teacher:'LUIS ERNESTO RODRÍGUEZ CRUZ',section:'03',reportedFinal:'8.1',rows:[
      ['Primera Evaluación Parcial',20,'10/04',7.03],['Talleres',15,'15/05',6.40],
      ['Segunda Evaluación Parcial',20,'27/05',8],['Laboratorios',15,'14/06',9.95],
      ['Proyecto',10,'30/06',9.60],['Evaluación Final',20,'02/07',8.50]
    ]},
    // La captura dice Cálculo III, pero repite el código de Cálculo II.
    // Se mantiene 010183 del pénsum para evitar confundir las dos materias.
    {id:'c4-m1',teacher:'ÓSCAR MAURICIO REYES HERNÁNDEZ',section:'02',reportedFinal:'8.0',rows:[
      ['CORTO 1',10,'22/08',9],['Primera Evaluación Parcial',20,'06/09',8.20],['CORTO 2',10,'24/09',9.40],
      ['Segunda Evaluación Parcial',25,'11/10',9.80],['CORTO 3',10,'05/11',5],['Evaluación Final',25,'22/11',6.20]
    ]},
    {id:'c4-m5',code:'090183',name:'Introducción a los derechos humanos',teacher:'MARÍA ELENA GONZÁLEZ RIVAS',section:'32',reportedFinal:'8.4',rows:[
      ['Primera Evaluación Parcial',20,'11/09',10],['Análisis documental',20,'30/09',5.10],
      ['Segunda Evaluación Parcial',20,'16/10',9.60],['Presentación de proyecto d…',20,'04/11',8.40],['Evaluación Final',20,'01/11',8.92]
    ]},
    // Se mantiene 200069 para Física II según el pénsum; la captura repite 200068.
    {id:'c4-m2',teacher:'JORGE ENRIQUE GARCÍA FLORES',section:'03',reportedFinal:'8.1',rows:[
      ['Primera Evaluación Parcial',20,'13/09',7.67],['Segunda Evaluación Parcial',20,'18/10',10],
      ['Discusiones',10,'04/11',7.13],['Laboratorios',20,'04/11',6.93],['Tareas',5,'05/11',10],
      ['Conferencia',5,'05/11',10],['Evaluación Final',20,'26/11',7.50]
    ]},
    {id:'c4-m4',teacher:'JUAN CARLOS RAMÍREZ TORRES',section:'01',reportedFinal:'7.3',rows:[
      ['Parcial I',20,'05/09',9.30],['Tarea I',5,'05/09',8.80],['Corto I',3,'02/10',4.10],
      ['Parcial II',25,'17/10',4],['Tarea II',2,'17/10',9.30],['Coprto II',5,'11/11',5.50],
      ['Proyecto construcción de m…',15,'21/11',9.70],['Parcial III',25,'24/11',8.10]
    ]},
    {id:'c4-m3',teacher:'CLAUDIA PATRICIA FLORES MARTÍNEZ',section:'02',reportedFinal:'8.2',rows:[
      ['Primer examen corto',5,'05/09',7],['Primera Examen Parcial',20,'20/09',9.40],
      ['Segundo Examen Parcial',25,'25/10',8.80],['Segundo examen corto',5,'31/10',10],
      ['Proyecto de Investigación',20,'12/11',6.88],['Examen final',25,'28/11',8.20]
    ]}
  ];
  references.forEach(reference => {
    const cycle = cycles.find(c=>c.subjects.some(s=>s.id===reference.id));
    const subject = cycle.subjects.find(s=>s.id===reference.id);
    const date = value => value ? `${cycle.year}-${value.split('/').reverse().join('-')}` : '';
    subject.teacher = reference.teacher;
    subject.section = reference.section;
    subject.reportedFinal = reference.reportedFinal;
    subject.source = 'reference';
    if (reference.code) subject.code = reference.code;
    if (reference.name) subject.name = reference.name;
    subject.evaluations = reference.rows.map(([name,weight,day,grade])=>({name,weight,date:date(day),grade}));
    if (reference.labs) {
      const group = subject.evaluations.at(-1);
      group.method = 'percentage';
      // La ponderación de cada laboratorio está recortada: no inferir el 25%.
      group.children = reference.labs.map(([name,day,grade])=>({name,weight:null,date:date(day),grade}));
    }
  });
  const calculatedGrade = subject => subject.evaluations.reduce((sum,e)=>sum+e.grade*e.weight/100,0);
  const finalGrade = subject => subject.reportedFinal !== undefined ? Number(subject.reportedFinal) : calculatedGrade(subject);
  const finalGradeText = subject => subject.reportedFinal ?? calculatedGrade(subject).toFixed(2);
  root.SRN = {cycles,finalGrade,calculatedGrade,finalGradeText};
  if (typeof module !== 'undefined') module.exports = root.SRN;
})(typeof window !== 'undefined' ? window : globalThis);
