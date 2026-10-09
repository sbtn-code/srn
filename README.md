# Sistema de Registro de Notas — proyecto académico

Maqueta estática de consulta de notas de Ingeniería Civil, Plan 2018, inspirada en las capturas proporcionadas. No es un portal oficial. Incluye transcripciones de las capturas proporcionadas y datos de ejemplo para completar el plan.

## Acceso de demostración

- Carnet: `00048724`
- Contraseña: `F9B3774E`

Abrir `index.html`. La ruta anterior `index.htm` redirige al nuevo inicio.

El acceso se simula en el navegador con `sessionStorage`; no es autenticación de servidor. No introducir credenciales reales. No se guardan ni se transmiten contraseñas. Para usuarios o expedientes reales se necesita un backend con autenticación y autorización.

## Contenido

- Inicio, consulta de notas y ayuda.
- Seis ciclos, del 01/2024 al 02/2026, con 28 materias según el pénsum entregado.
- Códigos y UV transcritos del Plan 2018. Optativas sin códigos inventados.
- Diez materias transcritas de las capturas: secciones, evaluaciones, ponderaciones, notas y nota final. Los nombres de docentes se sustituyen por nombres ficticios. Las demás mantienen ejemplos estables entre 7.0 y 9.0.
- Nota final de captura conservada literalmente; en materias de ejemplo se calcula por ponderación. Promedio del ciclo ponderado por UV usando la nota final de cada asignatura.
- Filtros combinables por columna, limpieza, paneles desplegables, impresión y cierre de sesión.
- Diseño adaptable; tablas con desplazamiento horizontal en pantallas pequeñas.

## Editar

`js/curriculum.js` contiene el plan, las transcripciones en `references` y la generación de evaluaciones de ejemplo.
`css/style.css` contiene los estilos. `js/app.js` controla consultas y filtros; `js/auth.js` controla el acceso de demostración.

GitHub Pages puede servir estos archivos directamente desde la raíz de `main`. Se conserva el archivo `CNAME` existente. No se requiere instalación ni compilación.

## Criterios de transcripción de las diez capturas

- Ciclo II: Cálculo I y Química general (ubicación del Plan 2018).
- Ciclo III: Estática, Física I y Programación y métodos numéricos.
- Ciclo IV: Cálculo III, Física II, Ecuaciones diferenciales, Mecánica de materiales e Introducción a los derechos humanos (optativa humanístico-social III).
- Años: se conserva el calendario 2024–2026. Estática muestra 2025 completo; los años recortados se completaron según el ciclo correspondiente. Día y mes se transcribieron de las imágenes.
- Los textos recortados de dos proyectos conservan puntos suspensivos; no se inventó su continuación. Se conserva “Coprto II” tal como aparece.
- Química: las ponderaciones individuales de laboratorios están recortadas; se muestran como no disponibles. Se conserva el agregado de 30% y 9.43. Las subevaluaciones no se suman otra vez.
- Se mantienen los códigos del pénsum para Cálculo III (010183) y Física II (200069), pues las capturas repiten los de Cálculo II y Física I.
- Las notas finales de captura se guardan en `reportedFinal` incluso cuando difieren del cálculo ponderado visible. `calculatedGrade` permite revisar el cálculo sin alterar la transcripción.
- Las capturas originales no se publican en el repositorio.
