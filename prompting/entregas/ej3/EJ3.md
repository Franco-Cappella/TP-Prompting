📓 Bitácora de Prompts — Ejercicio N° 2
Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, entregas/01-bitacora.md. Esta bitácora es parte de la nota. Un ejercicio sin bitácora no se corrige.

Datos
Alumno/a: Franco Cappella y Augusto Traverso
Ejercicio: N° 2
Fecha: 6/7/26
Modelo de IA usado: Prompts: Gemini ; Agente de código(CLI): Opencode 

1. 🎯 Qué me pidieron
Este ejercicio buscaba que refactorice lo hecho en el ejercicio pasado pero hacerlo mas eficiente con herencia 


2. 💬 Mis prompts (en orden)
Pegá todos los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.
Prompt #1
Lo que escribí:
PROMPT INICIAL
Prompt inicial
Actúa como un desarrollador backend sénior en Node/Express. Estamos trabajando en la refactorización de nuestra API RESTful para aplicar el principio DRY (Don't Repeat Yourself), esta vez atacando la duplicación de código dentro de una misma capa y separando responsabilidades.
Actualmente tenemos un problema de código repetido en dos áreas:
En cada uno de nuestros controladores (alumnos-controller.js, cursos-controller.js, etc.) duplicamos el mismo bloque de manejo de respuestas HTTP y try/catch.
En src/services/alumnos-service.js tenemos acoplada lógica utilitaria para el cálculo de fechas (calcularEdad y agregarEdad), la cual no pertenece a la lógica de negocio exclusiva de "alumnos" y debería ser reutilizable.
Queremos extraer esta lógica a funciones reutilizables (helpers) dentro de la carpeta src/helpers/.
Estas son las restricciones de diseño innegociables:
Pura refactorización transparente: No modifiques el comportamiento final de los endpoints. Los status codes HTTP (200, 404, 500, etc.), el formato del body y el cálculo matemático de las edades deben responder exactamente igual que antes para que no fallen las pruebas en Postman.
ES Modules: Los helpers deben ser módulos independientes exportados mediante ES modules (import/export).
Coherencia de diseño: Decide la mejor convención para agrupar los helpers (funciones sueltas vs. clase con métodos estáticos) basándote en que ya existe un log-helper.js en el proyecto. Mantén la coherencia visual y arquitectónica.
Inyección limpia: El helper de respuestas (ej. responderOk, responderNotFound, responderError) debe recibir el objeto de respuesta de Express (res) y los parámetros necesarios para despachar la petición, logrando que los controladores queden limpios y enfocados solo en orquestar.
--- REFERENCIA: LÓGICA REPETIDA EN CONTROLADORES ACTUALES ---
JavaScript
try {
    const algo = await currentService.loQueSea();
    if (algo != null) {
        res.status(StatusCodes.OK).json(algo);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`No se encontro...`);
    }
} catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
}

--- FIN DE REFERENCIA ---
Para avanzar de forma segura y modular, genera primero el código de los siguientes archivos:
src/helpers/respuestas-helper.js: Con la abstracción de las respuestas HTTP repetidas.
src/helpers/fechas-helper.js: Con las funciones extraídas calcularEdad y agregarEdad.
src/controllers/alumnos-controller.js (solo un endpoint de ejemplo): Muestra cómo queda refactorizado un endpoint utilizando el nuevo helper de respuestas.
src/services/alumnos-service.js (fragmento): Muestra cómo se importan y utilizan las funciones del helper de fechas ahora que ya no están definidas dentro de la clase del servicio.

Auto-chequeo de las 5 partes EFSI (marcá lo que incluiste):
[x ] Rol
[ x] Contexto (¿pegaste código del proyecto?)
[ x] Tarea
[ x] Restricciones
[] Iteración
Qué me devolvió (resumen):
Me devolvió los helpers de fecha y de respuesta y los aplico en los controllers

¿Me sirvió tal cual, o tuve que corregir/repreguntar?
Me sirvio tal cual

Prompt #2
Lo que escribí:
—
Por qué necesité este segundo prompt (qué falló o faltó en el anterior):
no necesite

(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)

3. 🔧 Qué hizo la IA y qué hice yo
Marcá esto también en el código con comentarios // [IA] y // [YO]. Acá resumilo:
1.Archivo / función
2.Lo generó la IA
3.Lo modifiqué/escribí yo
4.Por qué

1.respuestas-helper
2.TODO
3.-
4.estandarizó las respuestas

1.fechas-helper
2.TODO
3.-
4.generalizó el método de calcular edad

1.alumnos-controller
2.utiliza el helper para los responses
3.-
4.aplica los helpers creados

1.alumnos-services
2.utiliza helpers para las fechas
3.-
4.aplico los helpers creados


4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA
No encontre nada raro, aplico los helpers correctamente


5. ✅ Verificación
- [x ] Los helpers están en `src/helpers/` y son `import`-ables (ES modules, no `require`).
- [x ] Cada endpoint que usa el helper quedó **más corto** y se lee mejor.
- [ x] Los **status codes no cambiaron**: probá happy path **y** casos de error (404, 400) en Postman.
- [x ] `calcularEdad` / `agregarEdad` ya **no están definidos dentro de `alumnos-service.js`**: viven en `src/helpers/fechas-helper.js` y el service los importa. La edad de los alumnos sigue dando el mismo número.
- [x ] El helper no quedó "atado" a una entidad puntual (es reutilizable por `cursos`, `materias`, etc.).







6. ✍️ Reflexión (300–600 palabras)
El proceso de refactorización llevado a cabo en este ejercicio nos permitió comprender de forma práctica el verdadero valor del principio DRY (Don't Repeat Yourself) y la correcta separación de responsabilidades. Extraer el manejo de respuestas HTTP a respuestas-helper.js limpió drásticamente nuestros controladores, dejándolos enfocados puramente en orquestar el flujo. De igual manera, mudar calcularEdad a fechas-helper.js nos ayudó a desanclar una utilidad genérica que estaba atrapada erróneamente dentro de las reglas de negocio de alumnos-service.js.
Sin embargo, el mayor aprendizaje de este ejercicio no radicó en decidir qué código encapsular, sino en tener el criterio arquitectónico para decidir qué código no extraer a un helper.
Al analizar los controladores y servicios de alumnos, cursos y materias, notamos que existen bloques de código que actualmente lucen casi idénticos. Un claro ejemplo es la validación inicial de los datos que llegan en el req.body antes de enviarlos al servicio (por ejemplo, verificar que el campo nombre exista y no esté vacío). Podríamos habernos sentido tentados a crear un validaciones-helper.js genérico para ahorrar unas cuantas líneas de código en cada endpoint POST o PUT.
Decidimos deliberadamente no extraer esta lógica.
El motivo principal es que estamos ante un caso de duplicación accidental, no esencial. Que la validación de un Alumno y la de un Curso sean idénticas hoy, es una mera coincidencia del estado actual del proyecto. En el futuro cercano, las reglas de negocio inevitablemente van a divergir: un "Alumno" requerirá validaciones de formato de DNI, edad mínima o formato de email; mientras que un "Curso" requerirá validaciones de cupos máximos, turnos o correlatividades.
Si hubiéramos extraído eso a un helper genérico hoy, habríamos acoplado dos entidades que conceptualmente no tienen relación. Cuando los requisitos cambien, ese supuesto helper reutilizable terminaría llenándose de sentencias if (entidad === 'alumno'), switch y lógica condicional compleja. Esto rompería el principio de Responsabilidad Única (SRP) y el principio Abierto/Cerrado (OCP), creando lo que en ingeniería de software se conoce como una falsa abstracción o el antipatrón de "la abstracción equivocada" (la cual es mucho más costosa de mantener que el código duplicado).
Otro fragmento que decidimos no extraer en esta etapa fue el bloque del catch en su totalidad. Aunque el registro del error (console.log) y la llamada a la respuesta 500 Internal Server Error se repiten en cada bloque, encapsular todo el try/catch dentro de una función de orden superior ocultaría el flujo de control nativo de JavaScript. Preferimos sacrificar un poco de repetición visual en favor de mantener la legibilidad y la predictibilidad del código en los controladores.
En conclusión, este ejercicio nos enseñó que el principio DRY no debe aplicarse a ciegas a cualquier texto repetido en el editor. Abstraer conceptos que son verdaderamente transversales (como el formato de una respuesta HTTP o el cálculo de una fecha) genera un sistema escalable e inteligente. Pero abstenerse de abstraer reglas de negocio que hoy se parecen por casualidad, es lo que garantiza que el software siga siendo flexible y fácil de mantener el día de mañana.







