# TODO — Taller 2 CaféClima
**Entrega:** 26 de abril de 2026, 23:55

---

## 1. Capturas de pantalla

### phpMyAdmin — 3 capturas
- [ ] Estructura de la BD (las 3 tablas visibles) → `http://localhost/phpmyadmin` → `cafeclima` → Estructura
- [ ] Tabla `consultas_clima` con filas → pestaña Examinar
- [ ] Tabla `precios_cafe` con filas → pestaña Examinar

> Primero abre la app (`ng serve` + `http://localhost:4200`) para que se guarden datos.

### Postman — 9 capturas

| # | Método | URL | Body |
|---|---|---|---|
| 1 | GET | `http://localhost/cafeclima/api/municipios/` | — |
| 2 | POST | `http://localhost/cafeclima/api/municipios/` | `{"nombre":"Chinchiná","departamento":"Caldas"}` |
| 3 | PUT | `http://localhost/cafeclima/api/municipios/?id=4` | `{"nombre":"Chinchiná Actualizado"}` |
| 4 | DELETE | `http://localhost/cafeclima/api/municipios/?id=4` | — |
| 5 | DELETE | `http://localhost/cafeclima/api/municipios/?id=99` | — → debe responder 404 |
| 6 | POST | `http://localhost/cafeclima/api/consultas/` | `{"id_municipio":1,"probabilidad_lluvia":80,"descripcion":"lluvia ligera","temperatura":17.9}` |
| 7 | GET | `http://localhost/cafeclima/api/consultas/` | — |
| 8 | POST | `http://localhost/cafeclima/api/precios/` | `{"precio_usd":2.40,"precio_cop":8663.47,"tasa_cambio":3609.78}` |
| 9 | GET | `http://localhost/cafeclima/api/precios/` | — |

---

## 2. Documento PDF

Usar `borrador-taller2.md` como base. Copiar en Word y completar:

- [ ] Portada — nombre, materia, universidad, fecha
- [ ] Pegar capturas de phpMyAdmin donde dice `[INSERTAR CAPTURA DE PHPMYADMIN]`
- [ ] Pegar capturas de Postman donde dice `[INSERTAR CAPTURAS DE POSTMAN]`
- [ ] Exportar a PDF

---

## 3. Git

- [ ] `git add .`
- [ ] `git commit -m "Feat taller2 completo"`
- [ ] `git push origin main`

---

## 4. Subir a Moodle

- [ ] Adjuntar el PDF en la actividad "Actividad colaborativa II"
- [ ] Confirmar que quedó enviado antes de las 23:55

---

## 5. Presentación

### Qué explicar (orden sugerido)
1. **Qué es CaféClima** — app para caficultores: clima + precio del café
2. **Problema del Taller 1** — los datos se perdían al cerrar la app
3. **Solución del Taller 2** — backend PHP + MySQL que guarda historial
4. **Mostrar en vivo**
   - Abrir `http://localhost:4200` → se guarda automáticamente
   - Abrir phpMyAdmin → mostrar filas en `consultas_clima` y `precios_cafe`
   - Hacer un GET en Postman → mostrar el historial
5. **Estructura del código** — mostrar carpeta `api/` y los 3 archivos PHP
6. **Conclusión** — Angular pide, PHP procesa, MySQL guarda

### Puntos clave a mencionar
- 3 tablas relacionadas con llave foránea (`id_municipio`)
- PDO con sentencias preparadas (no concatenación → sin SQL injection)
- CORS configurado para que Angular pueda llamar al backend local
- Códigos HTTP correctos: 201 al crear, 404 si no existe, 500 si falla la BD

### Si preguntan...
- **¿Por qué PHP y no Node?** — requisito de la materia
- **¿Por qué singleton en db.php?** — evita abrir múltiples conexiones por request
- **¿Qué pasa si XAMPP no está corriendo?** — la app Angular sigue mostrando clima y precio, solo falla el guardado

---

## Checklist final rápido

```
[ ] XAMPP encendido (Apache + MySQL)
[ ] ng serve corriendo
[ ] 3 capturas phpMyAdmin
[ ] 9 capturas Postman
[ ] PDF armado con capturas
[ ] Git push
[ ] Subido a Moodle
[ ] Presentación lista
```
