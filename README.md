# nUXorb — Sitio web

Sitio de **nUXorb**, agencia de tecnología e IA para PYMEs en México.
Diseño editorial *overland* (inspirado en sitios tipo SENDA 4×4): tipografía display
condensada, etiquetas monospace, paleta arena / teal tinta / naranja, secciones numeradas
y textura topográfica.

Construido con **React 19 + TypeScript + Vite 6 + Tailwind CSS v4**.

## Stack

| Herramienta | Uso |
|---|---|
| **React 19** | UI por componentes |
| **TypeScript** | Tipado estático |
| **Vite 6** | Dev server y build |
| **Tailwind CSS v4** | Estilos (tema CSS-first en `src/index.css`) |

> Página única (one-page) con navegación por anclas y scroll suave. No usa router.

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo → http://localhost:4321
npm run build    # producción → /dist
npm run preview  # previsualizar el build
```

## Estructura

```
.
├── index.html                 # entrada de Vite + fuentes (Anton, Space Mono, Inter)
├── public/
│   ├── favicon.svg            # asterisco de marca
│   └── topo.svg               # textura topográfica de fondo
├── src/
│   ├── main.tsx · App.tsx     # entrada + ensamblado de secciones
│   ├── index.css              # Tailwind v4 + tema (paleta, fuentes) + utilidades
│   ├── data/content.ts        # contenido (servicios, proceso, planes, equipo…)
│   └── components/
│       ├── Navbar.tsx · Footer.tsx · Logo.tsx · Reveal.tsx
│       ├── ui/                # Asterisk, Counter
│       └── sections/          # Hero, Stats, Servicios, Proceso, Planes,
│                              #   Nosotros, Contacto, CtaFinal
└── vite.config.ts
```

## Secciones (one-page)

`00` Hero · `01` Servicios (con filtros) · `02` Proceso (interactivo) ·
`03` Planes · `04` Nosotros · `05` Contacto · CTA final.

## Paleta

Arena `#ebe3d2` · Teal tinta `#14302a` · Naranja `#ff5c00` · Teal `#14a08c` ·
Amarillo `#f7e15c` (definida como tema en `src/index.css`).

## Pendientes de personalizar

- Correo real (`hola@nuxorb.com`) y número de WhatsApp (`https://wa.me/...`).
- El formulario de contacto es una demo en el cliente; conéctalo a un servicio
  (Formspree, Resend, Supabase…) en `src/components/sections/Contacto.tsx → submit`.
- Las fotos reales pueden reemplazar la consola de IA del hero y los fondos si lo deseas.
