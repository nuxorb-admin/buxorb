/* ===== Contenido central de nUXorb ===== */

export interface Service {
  category: string;
  name: string;
  specs: string[];
  description: string;
  tags: string[]; // para filtros
}

export const services: Service[] = [
  {
    category: "Conversacional · IA",
    name: "Agentes IA",
    specs: ["WhatsApp · Web", "24/7", "Multi-flujo"],
    description:
      "Bots y agentes autónomos que atienden, califican y resuelven dentro de los flujos internos de tu negocio.",
    tags: ["ia"],
  },
  {
    category: "Hecho a medida",
    name: "Software a medida",
    specs: ["ERP · CRM", "Roles", "API"],
    description:
      "Cualquier sistema que tu negocio necesita y no existe en el mercado, construido a tu operación.",
    tags: ["web"],
  },
  {
    category: "Producto web",
    name: "Plataformas web",
    specs: ["Panel admin", "Suscripción", "Reportes"],
    description:
      "Sistemas web con panel de administración, roles y cobro mensual. Con diagnóstico y setup inicial.",
    tags: ["web"],
  },
  {
    category: "Móvil · Flutter",
    name: "Apps móviles",
    specs: ["Android · iOS", "Una base", "Nativa"],
    description:
      "Aplicaciones nativas para Android e iOS construidas con Flutter: una sola base de código.",
    tags: ["apps"],
  },
  {
    category: "Engagement",
    name: "Juegos básicos",
    specs: ["Móvil", "Educativo", "Marca"],
    description:
      "Juegos educativos o de entretenimiento ligero, ideales para marca, enganche y campañas.",
    tags: ["apps"],
  },
  {
    category: "Procesos · n8n",
    name: "Automatizaciones",
    specs: ["n8n", "Integraciones", "Reportes"],
    description:
      "Flujos, integraciones API, notificaciones y reportes automáticos que ahorran horas cada semana.",
    tags: ["auto"],
  },
];

export const serviceFilters = [
  { id: "todo", label: "Todo" },
  { id: "ia", label: "IA" },
  { id: "web", label: "Web" },
  { id: "apps", label: "Apps" },
  { id: "auto", label: "Automatización" },
];

export interface ProcessStep {
  num: string;
  code: string;
  title: string;
  description: string;
  meta: { label: string; value: string }[];
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    code: "P-01",
    title: "Brief y propuesta",
    description:
      "Diagnosticamos tu necesidad y entregamos una propuesta clara en PDF: alcance, precio y tiempos. Sin letras chiquitas.",
    meta: [
      { label: "Duración", value: "2–3 días" },
      { label: "Entregable", value: "Propuesta PDF" },
      { label: "Costo", value: "Gratis" },
    ],
  },
  {
    num: "02",
    code: "P-02",
    title: "Diseño",
    description:
      "Definimos la experiencia y la interfaz en Figma antes de escribir una línea de código. Validas y aprobamos juntos.",
    meta: [
      { label: "Duración", value: "1–2 sem" },
      { label: "Entregable", value: "Figma" },
      { label: "Revisión", value: "Incluida" },
    ],
  },
  {
    num: "03",
    code: "P-03",
    title: "Desarrollo y QA",
    description:
      "Construimos en repositorio privado, con control de calidad y documentación obligatoria. Avances visibles cada semana.",
    meta: [
      { label: "Duración", value: "Según scope" },
      { label: "Repo", value: "Privado" },
      { label: "Docs", value: "Obligatoria" },
    ],
  },
  {
    num: "04",
    code: "P-04",
    title: "Entrega y soporte",
    description:
      "Lanzamos a producción y te acompañamos 30 días con soporte post-entrega y SLA de respuesta.",
    meta: [
      { label: "Soporte", value: "30 días" },
      { label: "SLA", value: "< 24h" },
      { label: "Garantía", value: "Incluida" },
    ],
  },
];

export interface Plan {
  code: string;
  name: string;
  model: string;
  features: string[];
  note: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    code: "N-01",
    name: "Proyecto a medida",
    model: "Pago único",
    features: [
      "Setup + desarrollo completo",
      "Pago 50/50 o por entregables",
      "Garantía de 30 días",
      "Documentación incluida",
    ],
    note: "Ideal para una app, sitio o sistema puntual.",
  },
  {
    code: "N-02",
    name: "SaaS + mantenimiento",
    model: "Recurrente",
    features: [
      "Suscripción mensual por módulo",
      "Mantenimiento y monitoreo",
      "Mejoras continuas",
      "Soporte prioritario",
    ],
    note: "El más elegido por negocios que ya operan con nosotros.",
    featured: true,
  },
  {
    code: "N-03",
    name: "Consultoría & automatización",
    model: "Mixto",
    features: [
      "Sesiones de diagnóstico",
      "Integraciones puntuales",
      "Flujos de automatización",
      "Capacitación a tu equipo",
    ],
    note: "Para optimizar lo que ya tienes.",
  },
];

export interface Member {
  initial: string;
  name: string;
  role: string;
  stack: string;
}

export const team: Member[] = [
  {
    initial: "D",
    name: "Diego",
    role: "Dev Lead · Full Stack & IA",
    stack: "Flutter · React · Supabase · n8n",
  },
  { initial: "D", name: "Diana", role: "Ops & Administración", stack: "Finanzas · Procesos" },
  { initial: "E", name: "Eduardo", role: "Ventas & Soluciones", stack: "Diagnóstico · Cierre" },
  { initial: "C", name: "César", role: "Creatividad & Producto", stack: "Diseño · Demos · Contenido" },
];

export const techStack = [
  "React",
  "Flutter",
  "Supabase",
  "n8n",
  "TypeScript",
  "OpenAI",
  "Node",
  "PostgreSQL",
];

export interface Stat {
  to: number;
  decimals?: number;
  suffix?: string;
  label: string;
  note?: string;
}

export const stats: Stat[] = [
  { to: 5.1, decimals: 1, suffix: "M", label: "PYMEs en México por automatizar", note: "INEGI 2023" },
  { to: 30, suffix: " días", label: "de soporte y garantía post-entrega" },
  { to: 6, label: "líneas de servicio, un solo equipo" },
];
