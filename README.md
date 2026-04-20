# CaféClima

App para caficultores colombianos, les dice si va a llover y a cuánto está el café, para que no pierdan el trabajo ni la plata abonando en un mal día.

Hecha con Angular 21, proyecto académico de la Universidad de Manizales.

---

## ¿Para qué sirve?

Cuando un campesino va a abonar su café y llueve, pierde el tiempo y el abono, con CaféClima puede revisar antes de salir al campo:

- si va a llover y qué tan probable es
- a cuánto está el café en COP por libra, sacado directo de la Bolsa de Nueva York

---

## Con qué está hecho

- Angular 21 con standalone components
- TypeScript
- CSS puro, sin frameworks de UI
- [OpenWeatherMap API](https://openweathermap.org/api) para el clima
- [ExchangeRate API](https://www.exchangerate-api.com/) para el precio del café en COP

---

## Estructura

```
src/
└── app/
    ├── components/
    │   ├── navbar/
    │   └── footer/
    ├── pages/
    │   └── home/
    ├── services/
    │   └── data.ts
    ├── app.config.ts
    ├── app.routes.ts
    └── app.ts
```

---

## Correrlo localmente

Necesitas Node.js 18+ y Angular CLI.

```bash
git clone https://github.com/protonProjects/CafeClima.git
cd CafeClima
npm install
ng serve
```

Abrir `http://localhost:4200`.

---

## Autores

Gabriel Gómez y Pablo Nieto — Universidad de Manizales, 2026
