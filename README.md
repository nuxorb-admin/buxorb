# Nuxorb

Plataforma modular de administración para PyMEs mexicanas (Tesorería, Compras y
Proveedores, Gestión de Personal, Ventas y CxC). Este repo contiene la landing
de marketing, el CRM interno del equipo y un demo funcional del producto.

**Para entender qué es cada cosa, cómo está armado y qué falta por construir,
ver [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — léelo antes de tocar
código.**

Construido con **React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + Supabase**.

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo → http://localhost:4321
npm run build    # producción → /dist
npm run preview  # previsualizar el build
```

## Setup

```bash
cp .env.example .env.local   # completar con credenciales reales (ver docs/ARCHITECTURE.md)
```

Correr [`supabase/schema.sql`](./supabase/schema.sql) en el SQL Editor de tu
proyecto de Supabase antes del primer `npm run dev`.

## Documentación

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — estado real del repo: las
  3 superficies (landing, `/admin`, demo del SaaS), routing, modelo de datos,
  variables de entorno, limitaciones y seguridad conocidas.
- [`docs/ARQUITECTURA.md`](./docs/ARQUITECTURA.md) — visión de producto a
  futuro (SaaS multi-tenant real con subdominios, monorepo, aislamiento por
  cliente). Es referencia de vocabulario, no describe lo que existe hoy.
