*📓 Bitácora de Prompts — Ejercicio N° 1
Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, entregas/01-bitacora.md. Esta bitácora es parte de la nota. Un ejercicio sin bitácora no se corrige.

Datos
Alumno/a: Franco Cappella
Ejercicio: N° 1
Fecha: 6/7/26
Modelo de IA usado: Prompts: Gemini ; Agente de código(CLI): Opencode 

1. 🎯 Qué me pidieron
Este ejercicio buscaba que replique los endpoints de las otras tablas en la nueva tabla materias. 


2. 💬 Mis prompts (en orden)
Pegá todos los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.
Prompt #1
Lo que escribí:
Actúa como un desarrollador backend Node/Express experto. Estamos trabajando en una API RESTful con una arquitectura limpia en capas (Repository, Service, Controller). Usamos ES Modules, PostgreSQL puro con la librería `pg` (sin ORM) y delegamos las consultas a una clase envoltorio custom llamada `DbPg`.

Tu tarea es ayudarme a construir el CRUD para una nueva tabla llamada `materias`, la cual tiene la siguiente estructura básica:
- `id` SERIAL PRIMARY KEY
- `nombre` VARCHAR(75) NOT NULL

Debes basarte estrictamente en el código de la entidad "cursos" que te paso como referencia abajo. Estas son las reglas innegociables:
1. Mantén exactamente el mismo patrón, sintaxis y estilo de los archivos de referencia.
2. Delega el acceso a datos en los métodos de `DbPg` (`this.db.queryAll`, `this.db.queryOne`, `this.db.queryReturnId`, `this.db.queryRowCount`). No interactúes con el Pool de conexiones de pg directamente.
3. Utiliza consultas parametrizadas (`$1`, `$2`) en SQL.
4. Conserva los `console.log` de trazabilidad al inicio de cada método.
5. Utiliza el operador `?? ''` para los valores del body en la creación y actualización.
6. En el Controller, asegúrate de devolver los status codes correctos (200, 201, 400, 404, 500) y de validar en el PUT que el ID de la URL coincida con el ID del body usando `parseInt`.
7. No añadas dependencias nuevas.

--- REFERENCIA: src/repositories/cursos-repository.js ---
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

--- REFERENCIA: src/services/cursos-service.js ---
import CursosRepository from '../repositories/cursos-repository.js';

export default class CursosService {
    constructor() {
        console.log('Estoy en: CursosService.constructor()');
        this.CursosRepository = new CursosRepository();
    }

    getAllAsync = async () => {
        console.log(`CursosService.getAllAsync()`);
        return await this.CursosRepository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        console.log(`CursosService.getByIdAsync(${id})`);
        return await this.CursosRepository.getByIdAsync(id);
    }

    createAsync = async (entity) => {
        console.log(`CursosService.createAsync(${JSON.stringify(entity)})`);
        return await this.CursosRepository.createAsync(entity);
    }

    updateAsync = async (entity) => {
        console.log(`CursosService.updateAsync(${JSON.stringify(entity)})`);
        return await this.CursosRepository.updateAsync(entity);
    }
    
    deleteByIdAsync = async (id) => {
        console.log(`CursosService.deleteByIdAsync(${id})`);
        return await this.CursosRepository.deleteByIdAsync(id);
    }
}

--- REFERENCIA DEL ESTILO DE CONTROLLER (Extracto del PUT) ---
router.put('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let entity = req.body;

        if (entity.id && parseInt(entity.id) !== id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`El id de la URL (${id}) no coincide con el id del body (${entity.id}).`);
        }
        // ... (resto del código igual a cursos)
--- FIN DE REFERENCIAS ---

Para mantener el control y revisar bien el código, vamos a ir paso a paso. Por favor, genera AHORA MISMO ÚNICAMENTE el archivo `src/repositories/materias-repository.js`. 

No generes el Service ni el Controller todavía. Espera mi feedback. 


Auto-chequeo de las 5 partes EFSI (marcá lo que incluiste):
[x ] Rol
[ x] Contexto (¿pegaste código del proyecto?)
[ x] Tarea
[ x] Restricciones
[] Iteración
Qué me devolvió (resumen):
Me devovlvio el repositorio de la tabla materias para que yo luego pueda pedirle que haga el servicio y controlador de esa misma tabla

¿Me sirvió tal cual, o tuve que corregir/repreguntar?
Me sitio tal cual ya que replico lo mismo de los demas repositories del proyecto

Prompt #2
Lo que escribí:
“hace el service y controller de esa tabla”


Por qué necesité este segundo prompt (qué falló o faltó en el anterior):
Le pedi que haga únicamente el repository para que lo revise y después haga el service y controller

(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)

3. 🔧 Qué hizo la IA y qué hice yo
Marcá esto también en el código con comentarios // [IA] y // [YO]. Acá resumilo:
Archivo / función
Lo generó la IA
Lo modifiqué/escribí yo
Por qué
materias-controller
TODO
-
replico perfectamente la estructura que ya estaba hecha
materias-service
TODO
-
replico perfectamente la estructura que ya estaba hecha
materias-repository
TODO
-
replico perfectamente la estructura que ya estaba hecha
sever.js
NADA
import del controller para el prefijo del router
No lo hizo la ia


4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA
A la IA le falto incluir los controllers en el server asi que los inclui a mano


5. ✅ Verificación
- [ x] El repository delega el acceso a datos en la clase `DbPg` (`this.db.queryAll/queryOne/...`), igual que `alumnos-repository.js`. No toca el `Pool` directamente ni crea un `Client` nuevo por request (de eso se encarga `db-pg.js` con lazy init).
- [ x] Las queries usan placeholders `$1, $2...` (no concatenación de strings → eso sería SQL injection, ver ejercicio 09).
- [ x] El controller devuelve los **status codes correctos**: 200, 201 en POST, 404 cuando no existe, 400 en error de input.
- [ x] El `update` valida que el `id` de la URL coincida con el del body (mirá cómo lo hace `alumnos-controller.js` en el `PUT`).
- [ x] El controller está registrado en `server.js` y los 5 endpoints responden en Postman.
- [ x] No aparecieron dependencias nuevas en `package.json`.



6. ✍️ Reflexión (300–600 palabras)
Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— qué corregiste de lo que te dio la IA. Escribí con tus palabras; esto se contrasta con el oral.
Para encarar este ejercicio, decidí adoptar un enfoque estrictamente iterativo y guiado por el contexto existente del proyecto. En lugar de lanzar un prompt genérico solicitando "un CRUD de materias en Node.js", la principal decisión estratégica fue acotar el alcance de la inteligencia artificial dandole ejemplos exactos de los componentes homólogos (cursos-repository.js y cursos-service.js). Esto resultó fundamental para que el código generado respetara la arquitectura limpia en capas preestablecida y, sobre todo, para que interactuara de forma nativa con la clase envoltorio DbPg mediante sus métodos específicos (queryAll, queryOne, etc.), evitando que la IA intentara implementar soluciones alternativas con ORMs tradicionales o conexiones directas al pool de pg.
El proceso de fragmentar la generación (solicitando primero de forma exclusiva el Repository) me permitió validar minuciosamente que la lógica de persistencia mantuviera las restricciones de seguridad y estilo, como el uso estricto de consultas parametrizadas para mitigar riesgos de SQL Injection y la consistencia en los console.log de trazabilidad. Una vez asegurada la base de datos, avanzar hacia el Service y el Controller fue un proceso fluido donde la IA replicó con precisión el manejo de las reglas de negocio y la validación de coincidencia de IDs en el método PUT, devolviendo los códigos de estado HTTP correspondientes (como 400 Bad Request ante discrepancias de identificadores).
El mayor aprendizaje de esta práctica radica en comprender que el valor de la IA no está en delegar el pensamiento, sino en usarla como un acelerador de código estructurado bajo un patrón claro. Aunque la generación de las tres capas fue impecable, la IA no automatiza la visión global del sistema; por ejemplo, la integración final en src/server.js requirió mi intervención manual (// [YO]) para importar el nuevo controlador y montar la ruta en /api/materias. Además, este ejercicio sirvió como un excelente punto de partida para analizar el comportamiento de operadores lógicos y de coalescencia. Al revisar cómo se estructuran los vectores de valores con ?? '', queda claro el peligro de usar un operador || en escenarios donde un valor legítimo como false o 0 (muy comunes en campos de control o calificaciones) podría ser interpretado erróneamente como un valor ausente o falsy, rompiendo la integridad de los datos en la base.



