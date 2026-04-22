# Taller 2 — CaféClima: Backend PHP + MySQL

**Asignatura:** Programación Orientada a Sitios Web — Universidad de Manizales  
**Equipo:** Pablo Nieto  
**Entrega:** 26 de abril de 2026, 23:55  
**Repo:** https://github.com/protonProjects/CafeClima

---

## Contexto

El Taller 1 entregó la app Angular que muestra clima y precio del café consumiendo APIs externas.  
El Taller 2 añade un **backend propio en PHP + MySQL** que corre en XAMPP y persiste datos generados por la app.

La app Angular sigue igual en su función principal (clima + precio de APIs externas). Lo nuevo es que ahora también **guarda un historial** de consultas y permite administrar las ciudades favoritas del caficultor, todo a través de un servicio REST local.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | Angular 21 (ya existente) |
| Backend / API REST | PHP 8.x (XAMPP Apache) |
| Base de datos | MySQL 8.x (XAMPP phpMyAdmin) |
| Servidor local | XAMPP — Apache en `localhost:80`, MySQL en `3306` |
| Control de versiones | Git → GitHub (`protonProjects/CafeClima`) |

---

## Estructura de carpetas nueva

```
CafeClima/
├── api/                        ← carpeta nueva (PHP)
│   ├── config/
│   │   └── db.php              ← conexión a la BD
│   ├── municipios/
│   │   └── index.php           ← GET list, POST create, PUT update, DELETE
│   ├── consultas/
│   │   └── index.php           ← GET list, POST create
│   └── precios/
│       └── index.php           ← GET list, POST create
├── db/
│   └── cafeclima.sql           ← script SQL completo (schema + seed)
├── docs/
│   ├── Actividad colaborativa I_ taller práctico.pdf
│   ├── Anexo.pdf
│   └── TALLER2.md              ← este archivo
└── src/                        ← Angular (sin cambios estructurales)
    └── app/
        └── services/
            └── data.ts         ← añadir métodos para la API propia
```

> La carpeta `api/` debe copiarse (o enlazarse con symlink) a `C:/xampp/htdocs/cafeclima/api/` para que Apache la sirva.

---

## Base de datos — 3 tablas

### Diagrama

```
municipios          consultas_clima              precios_cafe
──────────          ───────────────              ────────────
id (PK)         ←── id_municipio (FK)            id (PK)
nombre              id (PK)                      precio_usd
departamento        probabilidad_lluvia           precio_cop
activo              descripcion                  tasa_cambio
creado_en           temperatura                  registrado_en
                    consultado_en
```

### Script SQL — `db/cafeclima.sql`

```sql
CREATE DATABASE IF NOT EXISTS cafeclima
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cafeclima;

CREATE TABLE municipios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  departamento  VARCHAR(100) NOT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consultas_clima (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  id_municipio        INT          NOT NULL,
  probabilidad_lluvia INT          NOT NULL,
  descripcion         VARCHAR(255) NOT NULL,
  temperatura         DECIMAL(5,2) NOT NULL,
  consultado_en       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_municipio) REFERENCES municipios(id) ON DELETE CASCADE
);

CREATE TABLE precios_cafe (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  precio_usd    DECIMAL(10,4) NOT NULL,
  precio_cop    DECIMAL(15,2) NOT NULL,
  tasa_cambio   DECIMAL(10,4) NOT NULL,
  registrado_en TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Seed: ciudades cafeteras iniciales
INSERT INTO municipios (nombre, departamento) VALUES
  ('Manizales',  'Caldas'),
  ('Pereira',    'Risaralda'),
  ('Armenia',    'Quindío');
```

---

## Endpoints REST — mínimo 3 (cubriendo GET, POST, PUT, DELETE)

| Método | URL | Acción | Código éxito | Códigos error |
|---|---|---|---|---|
| GET | `/cafeclima/api/municipios/` | Listar todos | 200 | 500 |
| POST | `/cafeclima/api/municipios/` | Crear municipio | 201 | 500 |
| PUT | `/cafeclima/api/municipios/?id={id}` | Actualizar nombre | 200 | 404, 500 |
| DELETE | `/cafeclima/api/municipios/?id={id}` | Eliminar | 200 | 404, 500 |
| GET | `/cafeclima/api/consultas/` | Historial de consultas | 200 | 500 |
| POST | `/cafeclima/api/consultas/` | Guardar consulta | 201 | 500 |
| GET | `/cafeclima/api/precios/` | Historial de precios | 200 | 500 |
| POST | `/cafeclima/api/precios/` | Guardar precio | 201 | 500 |

---

## Código PHP — paso a paso

### `api/config/db.php`

```php
<?php
class DB {
    private static ?PDO $conn = null;

    public static function connect(): PDO {
        if (self::$conn === null) {
            $dsn = 'mysql:host=localhost;dbname=cafeclima;charset=utf8mb4';
            self::$conn = new PDO($dsn, 'root', '', [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }
        return self::$conn;
    }
}
```

### `api/municipios/index.php`

```php
<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$db     = DB::connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $db->query('SELECT * FROM municipios WHERE activo = 1 ORDER BY nombre');
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        if (empty($body['nombre']) || empty($body['departamento'])) {
            http_response_code(400);
            echo json_encode(['error' => 'nombre y departamento son requeridos']);
            break;
        }
        try {
            $stmt = $db->prepare(
                'INSERT INTO municipios (nombre, departamento) VALUES (:nombre, :departamento)'
            );
            $stmt->execute([':nombre' => $body['nombre'], ':departamento' => $body['departamento']]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Municipio creado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $id   = intval($_GET['id'] ?? 0);
        $body = json_decode(file_get_contents('php://input'), true);
        $check = $db->prepare('SELECT id FROM municipios WHERE id = :id');
        $check->execute([':id' => $id]);
        if (!$check->fetch()) { http_response_code(404); echo json_encode(['error' => 'No encontrado']); break; }
        try {
            $stmt = $db->prepare('UPDATE municipios SET nombre = :nombre WHERE id = :id');
            $stmt->execute([':nombre' => $body['nombre'], ':id' => $id]);
            echo json_encode(['mensaje' => 'Actualizado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $id    = intval($_GET['id'] ?? 0);
        $check = $db->prepare('SELECT id FROM municipios WHERE id = :id');
        $check->execute([':id' => $id]);
        if (!$check->fetch()) { http_response_code(404); echo json_encode(['error' => 'No encontrado']); break; }
        try {
            $stmt = $db->prepare('DELETE FROM municipios WHERE id = :id');
            $stmt->execute([':id' => $id]);
            echo json_encode(['mensaje' => 'Eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
```

### `api/consultas/index.php`

```php
<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$db     = DB::connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        // JOIN para traer el nombre del municipio
        $stmt = $db->query(
            'SELECT c.*, m.nombre AS municipio
             FROM consultas_clima c
             JOIN municipios m ON m.id = c.id_municipio
             ORDER BY c.consultado_en DESC
             LIMIT 50'
        );
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        try {
            $stmt = $db->prepare(
                'INSERT INTO consultas_clima (id_municipio, probabilidad_lluvia, descripcion, temperatura)
                 VALUES (:id_municipio, :probabilidad_lluvia, :descripcion, :temperatura)'
            );
            $stmt->execute([
                ':id_municipio'        => $body['id_municipio'],
                ':probabilidad_lluvia' => $body['probabilidad_lluvia'],
                ':descripcion'         => $body['descripcion'],
                ':temperatura'         => $body['temperatura'],
            ]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Consulta registrada']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
```

### `api/precios/index.php`

```php
<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$db     = DB::connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $db->query(
            'SELECT * FROM precios_cafe ORDER BY registrado_en DESC LIMIT 30'
        );
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        try {
            $stmt = $db->prepare(
                'INSERT INTO precios_cafe (precio_usd, precio_cop, tasa_cambio)
                 VALUES (:precio_usd, :precio_cop, :tasa_cambio)'
            );
            $stmt->execute([
                ':precio_usd'  => $body['precio_usd'],
                ':precio_cop'  => $body['precio_cop'],
                ':tasa_cambio' => $body['tasa_cambio'],
            ]);
            http_response_code(201);
            echo json_encode(['id' => $db->lastInsertId(), 'mensaje' => 'Precio registrado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
}
```

---

## Cambios en Angular (`src/app/services/data.ts`)

Añadir al `DataService` existente los métodos que llaman a la API local:

```typescript
private urlApi = 'http://localhost/cafeclima/api';

getMunicipios(): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlApi}/municipios/`);
}

crearMunicipio(nombre: string, departamento: string): Observable<any> {
  return this.http.post(`${this.urlApi}/municipios/`, { nombre, departamento });
}

eliminarMunicipio(id: number): Observable<any> {
  return this.http.delete(`${this.urlApi}/municipios/?id=${id}`);
}

guardarConsulta(payload: object): Observable<any> {
  return this.http.post(`${this.urlApi}/consultas/`, payload);
}

getHistorialConsultas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlApi}/consultas/`);
}

guardarPrecio(payload: object): Observable<any> {
  return this.http.post(`${this.urlApi}/precios/`, payload);
}

getHistorialPrecios(): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlApi}/precios/`);
}
```

El `HomeComponent` puede llamar a `guardarConsulta()` y `guardarPrecio()` justo después de recibir la respuesta de las APIs externas (en los `next:` del `ngOnInit`).

---

## Guía de estilos — PHP

- **Nombres:** `camelCase` para variables y métodos, `PascalCase` para clases.
- **Indentación:** 4 espacios (no tabs).
- **Conexión:** siempre usar PDO con sentencias preparadas (`:param`), nunca concatenar valores del usuario en SQL.
- **Respuestas:** siempre `json_encode()`, nunca `echo` crudo.
- **Errores:** capturar con `try/catch PDOException`, responder con código HTTP apropiado antes de hacer `echo`.
- **CORS:** copiar el mismo bloque de headers en cada archivo `index.php`.
- **Comentarios:** solo donde el `por qué` no es obvio. Una línea máximo.

---

## Checklist — To-Do

### Base de datos
- [ ] Crear la BD `cafeclima` en phpMyAdmin
- [ ] Ejecutar `db/cafeclima.sql` para crear las 3 tablas
- [ ] Verificar que el seed de municipios insertó las 3 filas

### Backend PHP
- [ ] Crear carpeta `api/` en la raíz del proyecto
- [ ] Crear `api/config/db.php`
- [ ] Crear `api/municipios/index.php` (GET · POST · PUT · DELETE)
- [ ] Crear `api/consultas/index.php` (GET · POST)
- [ ] Crear `api/precios/index.php` (GET · POST)
- [ ] Copiar `api/` a `C:/xampp/htdocs/cafeclima/api/`
- [ ] Probar cada endpoint en Postman o Thunder Client

### Angular
- [ ] Añadir los 7 métodos nuevos a `data.ts`
- [ ] En `home.ts`: llamar a `guardarConsulta()` en el `next:` del clima
- [ ] En `home.ts`: llamar a `guardarPrecio()` en el `next:` del precio
- [ ] Verificar que no hay errores de CORS en la consola del navegador

### Git
- [ ] `git checkout -b taller2` — trabajar en rama separada
- [ ] Commits atómicos por tarea (db, config, municipios, consultas, precios, angular)
- [ ] `git push origin taller2` antes de la entrega

### Documento
- [ ] Portada con nombres y fecha
- [ ] Introducción (continuación del taller 1)
- [ ] Objetivo general
- [ ] Diagrama de tablas (copiar el de este archivo)
- [ ] Capturas de Postman para cada endpoint
- [ ] Capturas de phpMyAdmin mostrando datos insertados
- [ ] Conclusiones
- [ ] Bibliografía (PHP docs, MySQL docs, Angular HttpClient)

---

## Pruebas Postman — qué capturar

| # | Endpoint | Método | Body | Código esperado |
|---|---|---|---|---|
| 1 | `/cafeclima/api/municipios/` | GET | — | 200 + array JSON |
| 2 | `/cafeclima/api/municipios/` | POST | `{"nombre":"Chinchiná","departamento":"Caldas"}` | 201 |
| 3 | `/cafeclima/api/municipios/?id=4` | PUT | `{"nombre":"Chinchiná Actualizado"}` | 200 |
| 4 | `/cafeclima/api/municipios/?id=4` | DELETE | — | 200 |
| 5 | `/cafeclima/api/municipios/?id=99` | DELETE | — | 404 |
| 6 | `/cafeclima/api/consultas/` | POST | `{"id_municipio":1,"probabilidad_lluvia":80,"descripcion":"lluvia ligera","temperatura":17.9}` | 201 |
| 7 | `/cafeclima/api/consultas/` | GET | — | 200 + array con JOIN |
| 8 | `/cafeclima/api/precios/` | POST | `{"precio_usd":2.40,"precio_cop":8663.47,"tasa_cambio":3609.78}` | 201 |
| 9 | `/cafeclima/api/precios/` | GET | — | 200 + historial |

---

## Códigos HTTP implementados

| Código | Cuándo se usa |
|---|---|
| `200` | GET exitoso, PUT exitoso, DELETE exitoso |
| `201` | POST exitoso (recurso creado) |
| `400` | Body incompleto o inválido |
| `404` | Registro no existe (PUT/DELETE con id inexistente) |
| `500` | Error de base de datos (PDOException) |

---

## Bibliografía sugerida

- PHP Manual — PDO: https://www.php.net/manual/es/book.pdo.php
- MySQL 8.x Reference: https://dev.mysql.com/doc/refman/8.0/en/
- Angular HttpClient: https://angular.dev/guide/http
- MDN HTTP status codes: https://developer.mozilla.org/es/docs/Web/HTTP/Status
- XAMPP docs: https://www.apachefriends.org/
