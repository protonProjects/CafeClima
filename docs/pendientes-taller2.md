# Pendientes — Taller 2

## Lo que ya está listo

- [x] Base de datos `cafeclima` creada en phpMyAdmin
- [x] `db/cafeclima.sql` ejecutado — 3 tablas creadas
- [x] Seed insertado — Manizales, Pereira, Armenia en `municipios`
- [x] `api/config/db.php` — conexión PDO funcionando
- [x] `api/municipios/index.php` — GET · POST · PUT · DELETE respondiendo
- [x] `api/consultas/index.php` — GET · POST respondiendo
- [x] `api/precios/index.php` — GET · POST respondiendo
- [x] `api/` copiada a `C:/xampp/htdocs/cafeclima/api/`
- [x] `data.ts` con 7 métodos nuevos para la API local
- [x] `home.ts` guarda consulta de clima y precio en cada carga
- [x] Integración verificada — filas en `consultas_clima` y `precios_cafe`

---

## Lo que falta

### Capturas de Postman (para el documento)

- [ ] GET `municipios/` — array con los 3 municipios
- [ ] POST `municipios/` — crear Chinchiná → respuesta 201
- [ ] PUT `municipios/?id=4` — actualizar nombre → respuesta 200
- [ ] DELETE `municipios/?id=4` — eliminar → respuesta 200
- [ ] DELETE `municipios/?id=99` — id inexistente → respuesta 404
- [ ] POST `consultas/` — guardar consulta manual → respuesta 201
- [ ] GET `consultas/` — historial con JOIN → respuesta 200
- [ ] POST `precios/` — guardar precio manual → respuesta 201
- [ ] GET `precios/` — historial → respuesta 200

### Capturas de phpMyAdmin

- [ ] Pantalla de estructura de la BD (las 3 tablas)
- [ ] `consultas_clima` con filas insertadas (Examinar)
- [ ] `precios_cafe` con filas insertadas (Examinar)

### Documento PDF

- [ ] Portada — nombre, fecha, universidad
- [ ] Introducción (continúa el taller 1)
- [ ] Objetivo general
- [ ] Desarrollo — diagrama de tablas, código PHP, métodos Angular, capturas
- [ ] Conclusiones
- [ ] Bibliografía
