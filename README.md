# Sistema de Registro de Notas — proyecto académico

Maqueta estática de consulta de notas de Ingeniería Civil, Plan 2018, inspirada en las capturas proporcionadas. No es un portal oficial ni contiene expedientes reales.

## Acceso de demostración

- Carnet: `00048724`
- Contraseña: `Demo2026!`

Abrir `index.html`. La ruta anterior `index.htm` redirige al nuevo inicio.

El acceso se simula en el navegador con `sessionStorage`; no es autenticación de servidor. No introducir credenciales reales. No se guardan ni se transmiten contraseñas. Para usuarios o expedientes reales se necesita un backend con autenticación y autorización.

## Contenido

- Inicio, consulta de notas y ayuda.
- Seis ciclos, del 01/2024 al 02/2026, con 28 materias según el pénsum entregado.
- Códigos y UV transcritos del Plan 2018. Optativas sin códigos inventados.
- Docentes, fechas, secciones y notas ficticios. Las calificaciones son estables entre 7.0 y 9.0.
- Nota final calculada por ponderación; promedio del ciclo ponderado por UV sobre notas sin redondear.
- Filtros combinables por columna, limpieza, paneles desplegables, impresión y cierre de sesión.
- Diseño adaptable; tablas con desplazamiento horizontal en pantallas pequeñas.

## Editar

`js/curriculum.js` contiene el plan, docentes y generación de evaluaciones de ejemplo.
`css/style.css` contiene los estilos. `js/app.js` controla consultas y filtros; `js/auth.js` controla el acceso de demostración.

GitHub Pages puede servir estos archivos directamente desde la raíz de `main`. Se conserva el archivo `CNAME` existente. No se requiere instalación ni compilación.
