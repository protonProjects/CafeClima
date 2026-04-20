# Prompt para ChatGPT / DALL·E — Logo y Favicon de CaféClima

Usa este prompt en ChatGPT (modelo con DALL·E) o en cualquier generador de imágenes.  
Pide primero el **ícono solo**, luego el **logo completo con wordmark**.

---

## Prompt — Ícono / Favicon

```
Design a minimal flat icon for a Colombian coffee farmer app called "CaféClima".

Concept: A single unified symbol that combines a coffee leaf (bottom, rounded shape) 
and a raindrop (top, inverted teardrop that doubles as the leaf stem). 
The two shapes merge into one clean mark — viewed at a glance it reads as a leaf, 
on second look the raindrop becomes visible.

Style requirements:
- Flat design, NOT 3D, NO gradients, NO drop shadows
- Clean geometric shapes with slightly organic curves (not perfectly mathematical)
- Hand-crafted feel, NOT corporate, NOT AI-generated looking
- Stroke weight: 0 (solid shapes, no outlines)
- Negative space is used intentionally

Colors (use exactly these):
- Main shape: #3E2723 (deep coffee brown)
- Raindrop accent: #2E7D32 (forest green)
- Background: #FDF6EC (warm cream, not white)

Deliverable: Square icon, 512x512px canvas, centered mark using about 65% of canvas.
The icon must work at 32x32px (favicon) — keep it simple enough to read at small sizes.
No text, no wordmark, icon only.
```

---

## Prompt — Logo Completo con Wordmark

```
Design a full logo for "CaféClima" combining the icon above with a wordmark.

Wordmark specifications:
- Font style: elegant serif with warm character — similar to Playfair Display or Freight Display
- Text: "CaféClima" — the accent on the é must be visible
- Weight: Bold (700)
- Color: #3E2723 (deep coffee brown)

Layout: Icon on the left, wordmark on the right, vertically centered.
Horizontal padding between icon and text: equal to icon height × 0.3

Do NOT add:
- Taglines or subtitles
- Decorative frames or badges
- Any effects (glow, shadow, emboss)
- Multiple colors in the wordmark

Background: transparent PNG
Dimensions: 600 × 160px
```

---

## Prompt — Favicon Versión Simplificada

Si el ícono completo no se lee bien en 32×32px, usa este prompt alternativo:

```
Design an ultra-minimal favicon for "CaféClima".
Single color icon: a coffee bean shape (#3E2723) with a small raindrop 
cut out as negative space from the center-top of the bean.
Flat, no gradients, no borders.
Works perfectly at 16x16, 32x32 and 64x64 pixels.
Background: #FDF6EC (cream).
Deliver as square PNG.
```

---

## Instrucciones de Uso

1. Copiar el prompt del ícono y pegarlo en ChatGPT con DALL·E activado
2. Si el resultado no sigue exactamente el concepto, agregar: `"Keep it simpler. Remove any 3D effects. The shapes must be solid flat fills only."`
3. Pedir variaciones: `"Show me 3 variations of this icon, same concept, slightly different proportions"`
4. Una vez elegido el ícono, usar el segundo prompt para el logo completo
5. Exportar en PNG transparente para el wordmark, PNG con fondo crema para el favicon

---

## Archivos Finales Necesarios

| Archivo | Tamaño | Formato | Uso |
|---------|--------|---------|-----|
| `favicon.ico` | 32×32 | ICO | Pestaña del navegador |
| `icon-64.png` | 64×64 | PNG | PWA small |
| `icon-192.png` | 192×192 | PNG | PWA / Android |
| `icon-512.png` | 512×512 | PNG | App store / splash |
| `logo.png` | 600×160 | PNG transparente | Header de la app |
| `logo-dark.png` | 600×160 | PNG transparente | Sobre fondos oscuros |
