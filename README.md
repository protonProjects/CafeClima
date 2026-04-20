# CaféClima

Aplicación web para caficultores colombianos que consultan la probabilidad de lluvia y el precio del café antes de tomar decisiones en el campo.

Hecha con Angular 21. Proyecto académico — Universidad de Manizales, Tecnología en Desarrollo de Software para Negocios Digitales.

---

## ¿Para qué sirve?

Cuando un campesino va a abonar su café y llueve, pierde el tiempo trabajado y la materia prima. CaféClima le dice:

- **¿Va a llover hoy?** — Probabilidad de lluvia en su municipio en tiempo real
- **¿A cuánto está el café?** — Precio del café en COP por libra, actualizado desde la Bolsa de Nueva York

---

## Stack

- **Framework:** Angular 21 (standalone components)
- **Lenguaje:** TypeScript
- **APIs externas:**
  - [OpenWeatherMap](https://openweathermap.org/api) — pronóstico del clima
  - [ExchangeRate API](https://www.exchangerate-api.com/) — conversión USD → COP
- **Estilos:** CSS puro (sin frameworks de UI)

---

## Estructura del Proyecto

```
src/
└── app/
    ├── pages/
    │   └── home/           # Vista principal
    ├── services/
    │   └── data.ts         # Servicio HTTP (clima + precio café)
    ├── app.config.ts
    ├── app.routes.ts
    └── app.ts
```

---

## Correr el Proyecto Localmente

**Requisitos:** Node.js 18+, Angular CLI 21

```bash
# Clonar el repositorio
git clone https://github.com/pabloWIB/cafeclima.git
cd cafeclima

# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve
```

Abrir `http://localhost:4200` en el navegador.

---

## Variables de Entorno

Las API keys están en `src/app/services/data.ts`. Para producción, moverlas a `environment.ts`:

| Variable | API | Gratis |
|----------|-----|--------|
| `apiKeyClima` | OpenWeatherMap | Sí (1000 llamadas/día) |
| ExchangeRate | exchangerate-api.com | Sí (1500 llamadas/mes) |

---

## Autores

- **Gabriel Gómez**
- **Pablo Nieto**

Universidad de Manizales — 2026
