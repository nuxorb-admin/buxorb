/* ===== Contenido central de nUXorb — plataforma SaaS modular para PyMEs ===== */

export const failureStat = {
  value: 24,
  suffix: "%",
  label: "de las PyMEs que fallan en México lo hacen por desorden administrativo",
};

export interface PainPoint {
  title: string;
  description: string;
}

export const painPoints: PainPoint[] = [
  {
    title: "Operan en Excel y WhatsApp",
    description:
      "Información dispersa, capturas dobles y errores; nadie sabe el número real del negocio.",
  },
  {
    title: "Los ERP tradicionales no les quedan",
    description:
      "Sistemas rígidos y caros: pagan por funciones que no usan y aun así les falta lo esencial.",
  },
  {
    title: "Sin visibilidad de caja ni de deudas",
    description:
      "Deciden a ciegas: no saben cuánto hay, cuánto deben, cuánto les deben ni cuándo vence.",
  },
];

export interface SolutionPillar {
  title: string;
  description: string;
}

export const solutionPillars: SolutionPillar[] = [
  {
    title: "Modularidad real",
    description:
      "El cliente contrata solo lo que necesita y crece por partes. Cada módulo funciona solo, y juntos se potencian.",
  },
  {
    title: "IA integrada",
    description:
      "Lectura de tickets, extracción de extractos bancarios y captura por factura (CFDI): la IA propone, el usuario confirma.",
  },
  {
    title: "Automatización incluida",
    description:
      "Web app + automatizaciones N8N en todos los niveles: alertas, recordatorios y envíos sin trabajo manual.",
  },
  {
    title: "Una sola vista del negocio",
    description:
      "Los módulos comparten proyecciones de ingresos y egresos: el flujo de caja se arma solo.",
  },
];

export interface ProductModule {
  slug: string;
  order: string;
  name: string;
  tagline: string;
  description: string;
  priceEssential: number;
  priceProfessional: number;
  essentialFeatures: string[];
  professionalFeatures: string[];
}

export const modules: ProductModule[] = [
  {
    slug: "tesoreria",
    order: "Módulo 1 de 4",
    name: "Tesorería",
    tagline: "El dinero, claro y al día",
    description:
      "Visibilidad y control del flujo de caja y de las cuentas bancarias: cuánto entra, cuánto sale y cuánto hay disponible — con conciliación contra el banco.",
    priceEssential: 429,
    priceProfessional: 899,
    essentialFeatures: [
      "Registro de movimientos manual o por plantilla Excel, con categorías listas para usar",
      "Conciliación bancaria con reporte para el contador + 1 lectura de estado de cuenta PDF al mes",
      "Categorías personalizables y comparativo mes a mes",
    ],
    professionalFeatures: [
      "Flujo de caja consolidado por día, semana o mes, sin límite de cuentas",
      "Ingesta automática del archivo del banco (hasta 2 bancos)",
      "Vista por cuenta bancaria y hasta 2 conciliaciones PDF al mes",
    ],
  },
  {
    slug: "compras-proveedores",
    order: "Módulo 2 de 4",
    name: "Compras y Proveedores",
    tagline: "Del pedido a la cuenta por pagar",
    description:
      "Control del ciclo completo de compras — solicitud, aprobación, orden, recepción y cuentas por pagar — y de la relación con proveedores.",
    priceEssential: 429,
    priceProfessional: 899,
    essentialFeatures: [
      "Compra directa o con aprobación (configurable) + orden en PDF",
      "Cuentas por pagar: saldo por proveedor y fechas de vencimiento",
      "Recepción parcial y validación factura vs. orden de compra",
    ],
    professionalFeatures: [
      "La factura (XML) crea la compra sola; tickets se capturan con foto e IA",
      "Requisiciones y aprobaciones multinivel por monto o departamento",
      "Antigüedad de saldos, calendario de pagos y evaluación de proveedores",
    ],
  },
  {
    slug: "gestion-personal",
    order: "Módulo 3 de 4",
    name: "Gestión de Personal",
    tagline: "Nómina y equipo bajo control",
    description:
      "Ciclo completo del personal para negocios de 11-50 empleados: expediente, incidencias, cálculo de nómina y prestaciones de ley. El timbrado lo hace su contador.",
    priceEssential: 399,
    priceProfessional: 799,
    essentialFeatures: [
      "Expediente digital con documentos + altas masivas por plantilla",
      "Vacaciones automáticas según la ley (LFT)",
      "Importación de checador y reglas automáticas (retardos → faltas)",
    ],
    professionalFeatures: [
      "Prenómina calculada: ISR, IMSS, faltas y deducciones — con recibo y layout de dispersión",
      "Horas extra, aguinaldo, prima vacacional, finiquitos y liquidaciones",
      "Dashboard de ausentismo, rotación y costo por departamento",
    ],
  },
  {
    slug: "ventas-cxc",
    order: "Módulo 4 de 4",
    name: "Ventas y CxC",
    tagline: "De la oportunidad al cobro",
    description:
      "El ciclo comercial completo: prospectos, cotización, pedido, factura y cobranza — entrando por donde el negocio lo necesite, sin pasos obligatorios.",
    priceEssential: 499,
    priceProfessional: 1199,
    essentialFeatures: [
      "Seguimiento de prospectos y oportunidades",
      "Cartera clara: al corriente, por vencer y vencida",
      "Recordatorios de cobranza automáticos por correo",
    ],
    professionalFeatures: [
      "Cotización en PDF enviable → pedido → factura, con anticipos y pagos parciales",
      "Pipeline visual de ventas y aprobación de descuentos",
      "Antigüedad de saldos y estado de cuenta por cliente",
    ],
  },
];

export interface Tier {
  code: string;
  name: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    code: "N-01",
    name: "Essential",
    tagline: "Cubre las necesidades básicas del negocio",
    features: [
      "Procesos esenciales del módulo",
      "1 usuario además del admin",
      "1 integración API a elección del cliente",
    ],
  },
  {
    code: "N-02",
    name: "Professional",
    tagline: "Más procesos, detalle y automatización",
    features: [
      "Todo Essential + procesos avanzados y dashboards con mayor detalle",
      "3 usuarios además del admin",
      "+2 integraciones API adicionales",
    ],
    featured: true,
  },
  {
    code: "N-03",
    name: "Enterprise",
    tagline: "Diseñado 100% a la medida",
    features: [
      "Todo Professional + desarrollos a la medida del cliente",
      "Usuarios e integraciones según necesidad",
      "Alcance y precio caso por caso",
    ],
  },
];

export const comboDiscounts = [
  { modules: 2, discount: "Precio de lista" },
  { modules: 3, discount: "10% de descuento" },
  { modules: 4, discount: "15% de descuento" },
];

export const seatPricing = {
  price: 99,
  note: "Seat adicional, cualquier módulo y nivel — el seat es del módulo (un usuario en 2 módulos = 2 seats).",
};

export interface GrowthPlan {
  title: string;
  subtitle: string;
  features: string[];
}

export const growthPlans: GrowthPlan[] = [
  {
    title: "Multisucursal",
    subtitle: "Mismo RFC — la empresa abre otra ubicación",
    features: [
      "50% mensual adicional por sucursal (sobre el precio ya con descuento por combo)",
      "Contrata los mismos módulos que la matriz; cada sucursal opera de forma independiente",
      "Incluye 1 Superadmin sin costo con acceso a todas las sucursales",
      "Vista consolidada incluida — sin cuota anual",
    ],
  },
  {
    title: "Multicompañía",
    subtitle: "RFC distinto — otra empresa del mismo dueño",
    features: [
      "Cada compañía paga completo, con su propio descuento por combo",
      "Cuota anual de $1,599 + IVA por compañía adicional",
      "Con 3 o más compañías: 25% de descuento sobre el total de cuotas anuales",
      "La cuota incluye vista consolidada del grupo y catálogos compartidos (clientes y proveedores)",
    ],
  },
];

export interface Addon {
  name: string;
  module: string;
  description: string;
  pricing: string;
}

export const addons: Addon[] = [
  {
    name: "Checador básico",
    module: "Gestión de Personal",
    description: "Entradas y salidas por QR, sin hardware",
    pricing: "Mensual por empleado",
  },
  {
    name: "Portal del empleado",
    module: "Gestión de Personal",
    description: "Recibos, vacaciones y solicitudes desde el celular",
    pricing: "Mensual por empleado",
  },
  {
    name: "PTU",
    module: "Gestión de Personal",
    description: "Cálculo del reparto de utilidades",
    pricing: "Pago único anual",
  },
  {
    name: "Conciliación PDF ampliada",
    module: "Tesorería",
    description: "Más lecturas de estados de cuenta con IA",
    pricing: "Mensual o por evento",
  },
  {
    name: "Lectura de tickets ampliada",
    module: "Compras y Proveedores",
    description: "Más tickets leídos con IA que los incluidos en el nivel",
    pricing: "Mensual o por documento",
  },
  {
    name: "Inventario",
    module: "Compras y Proveedores",
    description: "Existencias alimentadas por las compras recibidas",
    pricing: "Mensual",
  },
  {
    name: "Timbrado CFDI",
    module: "Ventas y CxC",
    description: "Facturación fiscal vía Facturama",
    pricing: "Implementación única",
  },
  {
    name: "Chatbot de cobranza",
    module: "Ventas y CxC",
    description: "Recordatorios y saldos por WhatsApp",
    pricing: "Por conversación",
  },
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
    title: "Diagnóstico",
    description:
      "Revisamos cómo administras hoy tu negocio y te decimos con qué módulo y nivel empezar. Propuesta clara, sin letras chiquitas.",
    meta: [
      { label: "Duración", value: "2–3 días" },
      { label: "Entregable", value: "Propuesta" },
      { label: "Costo", value: "Gratis" },
    ],
  },
  {
    num: "02",
    code: "P-02",
    title: "Alta de módulos",
    description:
      "Activamos los módulos y niveles que contrataste, cargamos tu catálogo inicial y conectamos tus cuentas bancarias e integraciones.",
    meta: [
      { label: "Duración", value: "3–5 días" },
      { label: "Usuarios", value: "Según plan" },
      { label: "Setup", value: "Incluido" },
    ],
  },
  {
    num: "03",
    code: "P-03",
    title: "Capacitación",
    description:
      "Capacitamos a tu equipo en cada módulo activo, con sesiones prácticas sobre tus propios datos, no un demo genérico.",
    meta: [
      { label: "Formato", value: "En vivo" },
      { label: "Duración", value: "1–2 sem" },
      { label: "Material", value: "Incluido" },
    ],
  },
  {
    num: "04",
    code: "P-04",
    title: "Soporte y automatizaciones",
    description:
      "Quedan encendidas las automatizaciones N8N de tu plan (alertas, recordatorios, envíos) y tienes soporte continuo mientras operas.",
    meta: [
      { label: "Soporte", value: "Continuo" },
      { label: "SLA", value: "< 24h" },
      { label: "N8N", value: "Activo" },
    ],
  },
];
