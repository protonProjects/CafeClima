# CaféClima — Manual de Marca

## 1. Filosofía de Marca

CaféClima es una herramienta para el caficultor colombiano. No para una startup, no para un banco, no para una agencia. Para la persona que madruga, que trabaja con las manos y que necesita que la tecnología le hable claro.

El diseño de esta app debe sentirse **honesto, cálido y directo** — como hablar con alguien que sabe del campo. Nunca corporativo, nunca frío, nunca "hecho por IA".

**Tres palabras que guían cada decisión de diseño:**
- **Confiable** — si el campesino no le cree a la app, no la usa
- **Legible** — se usa al sol, en celular, con las manos sucias
- **Humano** — no somos un dashboard de datos, somos una herramienta de vida real

---

## 2. Paleta de Colores

### Colores Primarios

| Nombre | Hex | Uso |
|--------|-----|-----|
| Café Oscuro | `#3E2723` | Headers, botones principales, texto destacado |
| Verde Cosecha | `#2E7D32` | Datos positivos, clima despejado, precios favorables |
| Crema | `#FDF6EC` | Fondo de página — nunca blanco puro |

### Colores Secundarios

| Nombre | Hex | Uso |
|--------|-----|-----|
| Café Medio | `#6D4C41` | Bordes de tarjetas, acciones secundarias |
| Ámbar Cereza | `#F9A825` | Acento, iconos decorativos, badge de alerta media |
| Rojo Lluvia | `#C62828` | Alertas de lluvia, estados de peligro |

### Colores Neutros

| Nombre | Hex | Uso |
|--------|-----|-----|
| Texto Principal | `#1A1A1A` | Cuerpo de texto |
| Texto Secundario | `#616161` | Subtítulos, metadata |
| Blanco | `#FFFFFF` | Fondo de tarjetas (cards) |
| Separador | `#E0D6CC` | Líneas divisoras, bordes suaves |

### Reglas de Color
- El fondo de página es siempre `#FDF6EC`, nunca `#FFFFFF` puro ni gris
- Los números y datos importantes van en `#2E7D32` (verde) o `#C62828` (rojo) según contexto
- Nunca usar gradientes excepto en el hero banner y solo con los colores de la paleta
- Contraste mínimo WCAG AA en todo texto sobre fondo

---

## 3. Tipografía

### Fuentes

```
Display / Títulos principales:   Playfair Display (serif)
Cuerpo / UI / Labels:            Inter (sans-serif)
Números / Precios / Datos:       JetBrains Mono (monospace)
```

Todas disponibles gratis en Google Fonts.

### Escala Tipográfica

| Elemento | Fuente | Tamaño | Peso | Color |
|----------|--------|--------|------|-------|
| H1 (título hero) | Playfair Display | 2.5rem | 700 | `#3E2723` |
| H2 (sección) | Playfair Display | 1.75rem | 600 | `#3E2723` |
| H3 (card title) | Inter | 1.125rem | 600 | `#1A1A1A` |
| Body | Inter | 1rem | 400 | `#1A1A1A` |
| Caption / Label | Inter | 0.875rem | 400 | `#616161` |
| Número grande (dato) | JetBrains Mono | 3rem | 700 | `#2E7D32` o `#C62828` |
| Precio | JetBrains Mono | 2rem | 600 | `#2E7D32` |

### Reglas Tipográficas
- Interlineado mínimo de `1.6` para cuerpo de texto
- Nunca usar texto de menos de `14px` / `0.875rem`
- Los números siempre en `JetBrains Mono` — esto los hace inmediatamente reconocibles como datos
- Títulos en Playfair Display anclados a la marca, no en todos lados — solo H1 y H2

---

## 4. Logo y Favicon

### Concepto del Logo
El logo de CaféClima combina **dos elementos en un solo símbolo**:
- Una **hoja de café** (parte inferior, redondeada)
- Una **gota de lluvia** (parte superior, invertida que forma el tallo de la hoja)

El resultado es un ícono que a primera vista parece una hoja, y a segunda lectura muestra la gota. Simple, sin adornos, trazos limpios.

### Versiones del Logo
1. **Marca completa** — ícono + wordmark "CaféClima" en Inter 600
2. **Solo ícono** — para favicon y app icon (uso en 32px, 64px, 512px)
3. **Monocromático** — versión en `#3E2723` sobre fondo claro

### Espacio de Protección
El logo debe tener un espacio libre equivalente a la altura de la "C" del wordmark en todos los lados.

### Lo que NO se hace con el logo
- No estirar ni distorsionar
- No poner sobre fondos que no tengan suficiente contraste
- No agregar sombras, brillos ni efectos 3D
- No cambiar los colores por fuera de la paleta

---

## 5. Componentes UI

### Cards (Tarjetas de Datos)
```
Fondo:          #FFFFFF
Radio bordes:   16px
Sombra:         0 4px 16px rgba(62, 39, 35, 0.08)
Borde inferior: 6px solid #6D4C41
Padding:        28px 32px
Hover:          translateY(-4px), sombra aumenta suavemente
```

Las cards nunca tienen borde en los 4 lados — el borde inferior café es el único detalle de color.

### Botones
```
Primario:
  Fondo:      #3E2723
  Texto:      #FDF6EC
  Radio:      8px
  Padding:    12px 28px
  Hover:      #4E342E (un tono más claro)

Secundario:
  Fondo:      transparent
  Borde:      2px solid #3E2723
  Texto:      #3E2723
  Hover:      fondo #3E2723 al 8%
```

### Alertas de Lluvia
```
Alta probabilidad (>70%):   fondo #FFEBEE, ícono y texto #C62828
Media (40-70%):             fondo #FFF8E1, ícono y texto #F9A825
Baja (<40%):                fondo #E8F5E9, ícono y texto #2E7D32
```

### Inputs y Formularios
```
Borde:          1px solid #E0D6CC
Fondo:          #FFFFFF
Radius:         8px
Padding:        10px 16px
Focus:          borde #6D4C41, sin outline azul de browser
Placeholder:    color #9E9E9E
```

---

## 6. Iconografía

- Usar la librería **Lucide Icons** (MIT license, trazo limpio, no relleno)
- Grosor de trazo: siempre `1.5px`
- Tamaño base en UI: `20px`
- Tamaño en cards / destacados: `28px`
- Nunca mezclar estilos (no combinar Lucide con Material o FontAwesome)

Íconos clave del proyecto:
- Lluvia → `cloud-rain`
- Sol → `sun`
- Café → `coffee` o `leaf`
- Precio → `trending-up`
- Alerta → `alert-triangle`
- Ubicación → `map-pin`

---

## 7. Espaciado y Grid

Sistema de espaciado en múltiplos de `8px`:

```
4px   — micro (separación entre ícono y texto)
8px   — xs
16px  — sm
24px  — md
32px  — lg
48px  — xl
64px  — 2xl
96px  — 3xl
```

El layout principal usa un max-width de `1100px` centrado en página.
En mobile (< 768px) el padding lateral mínimo es `16px`.

---

## 8. Voz y Tono

### ¿Cómo habla CaféClima?

| Situación | Correcto | Incorrecto |
|-----------|----------|------------|
| Lluvia probable | "¡Ojo! Hay 78% de lluvia hoy — mejor espere mañana para abonar." | "Alta probabilidad de precipitación detectada." |
| Clima despejado | "Hoy es buen día. Sin lluvia, puede abonar tranquilo." | "Condiciones óptimas para la actividad agrícola." |
| Precio del café | "El café está a $9.240/lb hoy." | "El valor actual del commodity café es..." |
| Error de red | "No pudimos traer los datos. Revise su conexión." | "Error 503: Service Unavailable." |

### Reglas de Tono
- Siempre en **español colombiano**, usted de respeto
- Oraciones cortas, máximo 2 ideas por párrafo
- Los datos van primero, la explicación después
- Nunca usar jerga técnica visible al usuario

---

## 9. Fotografía e Ilustración

- Fotografías: campesinos reales, fincas cafeteras, paisaje colombiano — nunca stock photos de personas con trajes
- Ilustraciones: estilo lineal, trazo `2px`, sin rellenos complejos — si se usan, consistentes con la paleta
- Nunca usar imágenes generadas por IA visiblemente (sin texturas artificiosas, sin manos raras)
- Las imágenes de fondo van con `overlay rgba(62, 39, 35, 0.4)` para mantener legibilidad del texto

---

## 10. Lo que NO es CaféClima

- Glassmorphism, neumorphism, dark mode agresivo
- Gradientes arcoíris o colores neón
- Animaciones de carga excesivas o decorativas
- Tipografía sans-serif en los títulos principales
- Cards con bordes en los 4 lados con color vivo
- Emojis en la interfaz principal (salvo excepciones en mensajes cortos)
- Cualquier cosa que se vea como un template de Dribbble o una landing de SaaS americana
