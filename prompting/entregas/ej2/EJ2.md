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
Actúa como un desarrollador backend sénior en Node/Express. Estamos trabajando en la refactorización de nuestra API RESTful para aplicar el principio DRY (Don't Repeat Yourself). Actualmente tenemos tres repositorios (`cursos-repository.js`, `materias-repository.js` y `alumnos-repository.js`) que duplican casi toda la lógica de lectura y eliminación básica (`getAllAsync`, `getByIdAsync`, `deleteByIdAsync`).

Queremos implementar la Estrategia de Herencia creando una clase base llamada `BaseRepository` en `src/repositories/base-repository.js` de la cual hereden los repositorios de las entidades.

Estas son las restricciones de diseño innegociables:
1. No introduzcas ningún ORM (como Sequelize o Prisma). Seguimos usando SQL crudo a través de la clase envoltorio `DbPg` (`src/repositories/db-pg.js`).
2. Para mantener la consistencia con el estilo actual del proyecto, escribe los métodos genéricos en la clase base y en las hijas utilizando campos de clase con funciones flecha (`method = async () => {}`).
3. El método base utilizará interpolación de strings ÚNICAMENTE para el nombre de la tabla (ej. `SELECT * FROM ${this.tabla}`), lo cual es seguro ya que el nombre de la tabla lo controlamos nosotros internamente en el constructor y no proviene del input del usuario. Cualquier parámetro dinámico (como el `id`) debe seguir usando placeholders (`$1`).
4. Conserva los `console.log` de trazabilidad al inicio de cada método, dinámicando el nombre de la clase o tabla para identificarlo en la consola de logs.
5. No modifiques la firma ni el comportamiento de los métodos públicos para que Postman y el resto de las capas (Services/Controllers) no sufran ningún cambio (debe ser un refactor transparente).

--- REFERENCIA: LÓGICA DE UN REPOSITORIO ACTUAL (cursos-repository.js) ---
import Db from './db-pg.js';

export default class CursosRepository {
    constructor() {
        console.log('Estoy en: CursosRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`CursosRepository.getAllAsync()`);
        const sql = `SELECT * FROM cursos`;
        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(`CursosRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM cursos WHERE id=$1`;
        return await this.db.queryOne(sql, [id]);
    }

    createAsync = async (entity) => {
        console.log(`CursosRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO cursos (nombre) VALUES ($1) RETURNING id`;
        const values = [entity?.nombre ?? ''];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`CursosRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `UPDATE cursos SET nombre = $2 WHERE id = $1`;
        const values =  [ entity.id, entity?.nombre ?? '' ];
        return await this.db.queryRowCount(sql, values);
    }

    deleteByIdAsync = async (id) => {
        console.log(`CursosRepository.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM cursos WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}
--- FIN DE REFERENCIA ---

Para avanzar de forma segura, genera primero los siguientes dos archivos:
1. `src/repositories/base-repository.js`: Con la abstracción de `getAllAsync`, `getByIdAsync` y `deleteByIdAsync`.
2. `src/repositories/cursos-repository.js`: Refactorizado para extender `BaseRepository`, llamando a `super('cursos')` en su constructor y manteniendo únicamente las operaciones específicas de escritura (`createAsync` y `updateAsync`).

Auto-chequeo de las 5 partes EFSI (marcá lo que incluiste):
[x ] Rol
[ x] Contexto (¿pegaste código del proyecto?)
[ x] Tarea
[ x] Restricciones
[] Iteración
Qué me devolvió (resumen):
Me devolvió la clase padre para heredar en todos los repositories

¿Me sirvió tal cual, o tuve que corregir/repreguntar?
Me sitrvio tal cual

Prompt #2
Lo que escribí:
—
Por qué necesité este segundo prompt (qué falló o faltó en el anterior):
no necesite

(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)

3. 🔧 Qué hizo la IA y qué hice yo
Marcá esto también en el código con comentarios // [IA] y // [YO]. Acá resumilo:
Archivo / función
Lo generó la IA
Lo modifiqué/escribí yo
Por qué
cursos-repository
TODO
-
Aplicó herencia
materias-repository
TODO
-
Aplicó herencia
alumnos-repository
TODO
-
Aplicó herencia
base-repository
TODO
-
Hizo la base para heredar en los repositories


4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA
No encontre nada raro, aprendi a aplicar herencia


5. ✅ Verificación
- [ x] Los 5 endpoints de `alumnos`, `cursos` **y** `materias` siguen respondiendo **igual que antes** (mismos status codes, mismo JSON). Probalo en Postman antes y después.
- [x ] La lógica común está **en un solo lugar** (si arreglás un bug en `getAllAsync`, se arregla para todas las entidades).
- [ x] Lo específico de cada entidad (nombre de tabla, columnas del INSERT/UPDATE) sigue siendo claro y fácil de cambiar.
- [ x] La regla de negocio de `alumnos` (calcular `edad`, validar que el curso existe) **no se perdió** en el refactor.
- [ x] No se agregó un ORM ni dependencias nuevas.





6. ✍️ Reflexión (300–600 palabras)
El objetivo principal de esta práctica fue optimizar la arquitectura de nuestra API RESTful mediante la implementación de una estrategia de herencia. En la entrega anterior, se evidenciaba una clara duplicación de lógica (deuda técnica) en las operaciones básicas de lectura y eliminación (getAllAsync, getByIdAsync, deleteByIdAsync) a lo largo de los repositorios de cursos, materias y alumnos. Al no contar con una abstracción centralizada, cualquier cambio menor en la estructura de las consultas SQL o en el manejo del wrapper de la base de datos DbPg requería modificaciones manuales en múltiples archivos, aumentando la propensión a errores de consistencia.
Al abstraer este comportamiento repetitivo en una clase padre BaseRepository, logramos consolidar el principio DRY de manera efectiva. El diseño propuesto obligó a resolver desafíos interesantes de programación orientada a objetos (POO) aplicados a JavaScript moderno, tales como:
El uso correcto de super() para inicializar el contexto de la base de datos pasándole dinámicamente el nombre de la tabla.
El mantenimiento de funciones flecha como campos de clase para preservar el binding léxico del this.
La inyección segura de parámetros dinámicos (placeholders $1) para mitigar vulnerabilidades de inyección SQL (SQLi), aislando la interpolación únicamente para los identificadores de tablas que controlamos internamente.
El resultado final es un refactor completamente transparente para las capas superiores (Services y Controllers). Logramos reducir drásticamente las líneas de código redundante en los repositorios hijos, dejándolos enfocados únicamente en sus responsabilidades específicas y reglas de negocio particulares (como las inserciones y actualizaciones de campos específicos).

A nivel metodológico, la inteligencia artificial actuó como un acelerador de código boilerplate excelente. Al estructurar un prompt inicial con un rol bien definido (Senior Backend Developer), contexto técnico preciso y restricciones estrictas (sin ORMs, manteniendo la trazabilidad con console.log), la respuesta generada fue arquitectónicamente sólida y modular desde el primer intento. Esto demuestra que un prompt técnico bien diseñado minimiza el ciclo de iteración y permite enfocarse puramente en la verificación del comportamiento del sistema y en la calidad del diseño de software.



7. 🔗 Adjuntos
[ ] Link/PDF de la conversación completa con la IA
[ ] Commit(s) en GitHub: ____________
[ ] Capturas / evidencias de verificación




