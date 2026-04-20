# Próximos Pasos — CaféClima

## Información del Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre del proyecto** | CaféClima |
| **Nombre del repositorio** | `cafeclima` |
| **Descripción del repo** | Aplicación Angular para caficultores colombianos — pronóstico de lluvia y precio del café en tiempo real. |
| **Visibilidad** | Público |
| **URL sugerida** | `github.com/pabloWIB/cafeclima` |

---

## Pasos Pendientes (en orden)

### Paso 1 — Renombrar el Repositorio en GitHub
- Ir a GitHub → Settings del repo actual → rename a `cafeclima`
- Actualizar el remote local:
  ```bash
  git remote set-url origin https://github.com/pabloWIB/cafeclima.git
  ```

---

### Paso 2 — Crear el Logo y Favicon
- Usar el prompt en `docs/chatgpt-logo-prompt.md` con ChatGPT / DALL·E
- Guardar los archivos en `src/assets/`:
  ```
  src/assets/
  ├── favicon.ico
  ├── logo.png
  └── logo-dark.png
  ```
- Reemplazar el favicon en `src/index.html`:
  ```html
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
  ```

---

### Paso 3 — Crear los 2 Componentes Faltantes
El enunciado exige mínimo 3 componentes. Solo existe `HomeComponent`.

**Componentes a crear:**

```bash
ng generate component components/navbar
ng generate component components/footer
```

- `NavbarComponent` — barra superior con el logo y el nombre de la app
- `FooterComponent` — créditos, nombre de los autores, universidad

Agregarlos al `app.html` principal:
```html
<app-navbar />
<router-outlet />
<app-footer />
```

---

### Paso 4 — Aplicar el Manual de Marca al CSS
- Importar las fuentes en `src/index.html`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
  ```
- Actualizar `src/styles.css` con la paleta y variables del brand manual
- Aplicar tipografía y colores en `home.css` y los nuevos componentes

---

### Paso 5 — Hacer las Capturas de POSTMAN
El enunciado pide evidencia de **mínimo 3 llamados REST** en POSTMAN.

**Llamados a documentar:**

1. `GET` clima Manizales:
   ```
   https://api.openweathermap.org/data/2.5/forecast?q=Manizales&appid=TU_KEY&units=metric&lang=es&cnt=1
   ```

2. `GET` tasas de cambio USD:
   ```
   https://api.exchangerate-api.com/v4/latest/USD
   ```

3. `GET` clima otra ciudad (ej. Pereira):
   ```
   https://api.openweathermap.org/data/2.5/forecast?q=Pereira&appid=TU_KEY&units=metric&lang=es&cnt=1
   ```

Guardar las capturas en `docs/postman/`.

---

### Paso 6 — Completar el Documento de Entrega
Abrir `docs/Actividad posw.pdf` (o el Word original) y agregar:

- **Sección: Desarrollo de la actividad propuesta**
  - Captura de la app corriendo
  - Código del servicio `data.ts` explicado
  - Las 3 capturas de POSTMAN
  - Explicación de los 3 componentes

- **Sección: Bibliografía**
  ```
  - OpenWeatherMap API. (2026). https://openweathermap.org/api
  - ExchangeRate API. (2026). https://www.exchangerate-api.com/
  - Angular Documentation. (2026). https://angular.dev
  - Google Fonts. (2026). https://fonts.google.com
  ```

---

### Paso 7 — Commit Final y Entrega
```bash
git add .
git commit -m "feat: app completa con navbar, footer y estilos de marca"
git push origin master
```

Entregar en la plataforma:
- Link al repositorio GitHub público
- PDF del documento completo

---

## Checklist Final

- [ ] Repo renombrado a `cafeclima` y público
- [ ] Logo y favicon creados e integrados
- [ ] 3 componentes presentes (Home + Navbar + Footer)
- [ ] 2 APIs REST funcionando (clima + precio)
- [ ] Estilos actualizados con el manual de marca
- [ ] 3 capturas de POSTMAN guardadas
- [ ] Documento con todas las secciones completo
- [ ] App corre sin errores con `ng serve`
- [ ] Push final al repositorio
