/* Ingeniería Civil, Plan 2018. Nombres, códigos y UV del pénsum proporcionado.
   Docentes, secciones, períodos, fechas y calificaciones son datos de demostración. */
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
  const finalGrade = subject => subject.evaluations.reduce((sum,e)=>sum+e.grade*e.weight/100,0);
  root.SRN = {cycles,finalGrade};
  if (typeof module !== 'undefined') module.exports = root.SRN;
})(typeof window !== 'undefined' ? window : globalThis);
