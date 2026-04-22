# CaféClima

App para caficultores colombianos, les dice si va a llover y a cuánto está el café, para que no pierdan el trabajo ni la plata abonando en un mal día.

Hecha con Angular 21 + backend PHP/MySQL. Proyecto académico de la Universidad de Manizales.

---

## ¿Para qué sirve?

Cuando un campesino va a abonar su café y llueve, pierde el tiempo y el abono. Con CaféClima puede revisar antes de salir al campo:

- si va a llover y qué tan probable es
- a cuánto está el café en COP por libra, sacado directo de la Bolsa de Nueva York

Cada consulta queda guardada en una base de datos local para llevar historial.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Angular 21 — standalone components, signals, RxJS |
| Backend | PHP 8 sobre XAMPP (Apache) |
| Base de datos | MySQL 8 (XAMPP phpMyAdmin) |
| APIs externas | OpenWeatherMap · ExchangeRate-API |

---

## Estructura

```
CafeClima/
├── api/                        ← Backend PHP (copiar a htdocs)
│   ├── config/db.php           ← Conexión PDO a MySQL
│   ├── municipios/index.php    ← CRUD municipios (GET/POST/PUT/DELETE)
│   ├── consultas/index.php     ← Historial de clima (GET/POST)
│   └── precios/index.php       ← Historial de precios (GET/POST)
├── db/
│   └── cafeclima.sql           ← Script SQL — schema + seed
└── src/app/
    ├── components/
    │   ├── navbar/
    │   └── footer/
    ├── pages/home/
    └── services/data.ts        ← Llama APIs externas + API local
```

---

## Correrlo localmente

### Requisitos

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- XAMPP con Apache y MySQL corriendo

### 1 — Base de datos

1. Abre **phpMyAdmin** → `http://localhost/phpmyadmin`
2. Ve a la pestaña **SQL**
3. Pega y ejecuta el contenido de `db/cafeclima.sql`

Eso crea la BD `cafeclima` con las 3 tablas y carga Manizales, Pereira y Armenia como municipios iniciales.

### 2 — Backend PHP

Copia la carpeta `api/` a la carpeta de XAMPP:

```
C:\xampp\htdocs\cafeclima\api\
```

Verifica que Apache esté corriendo y prueba en el navegador:

```
http://localhost/cafeclima/api/municipios/
```

Debe responder un JSON con los 3 municipios.

### 3 — Frontend Angular

```bash
git clone https://github.com/protonProjects/CafeClima.git
cd CafeClima
npm install
ng serve
```

Abrir `http://localhost:4200`.

Con los tres pasos completos, la app muestra el clima y el precio, y automáticamente guarda cada consulta en la BD local.

---

## Endpoints de la API local

| Método | URL | Descripción |
|---|---|---|
| GET | `/cafeclima/api/municipios/` | Lista municipios activos |
| POST | `/cafeclima/api/municipios/` | Crea municipio |
| PUT | `/cafeclima/api/municipios/?id={id}` | Actualiza nombre |
| DELETE | `/cafeclima/api/municipios/?id={id}` | Elimina municipio |
| GET | `/cafeclima/api/consultas/` | Historial de clima (últimas 50) |
| POST | `/cafeclima/api/consultas/` | Guarda consulta de clima |
| GET | `/cafeclima/api/precios/` | Historial de precios (últimos 30) |
| POST | `/cafeclima/api/precios/` | Guarda precio del café |

---

## Autores

Pablo Nieto — Universidad de Manizales, 2026
