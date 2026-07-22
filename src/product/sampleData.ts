export const samplePurchaseOrders = [
  {
    id: "OC-1042",
    provider: "Distribuidora del Valle",
    concept: "Materia prima",
    amount: 18400,
    status: "pendiente",
    date: "2026-07-14",
  },
  {
    id: "OC-1041",
    provider: "Suministros Ríos",
    concept: "Empaque",
    amount: 6200,
    status: "aprobada",
    date: "2026-07-10",
  },
  {
    id: "OC-1039",
    provider: "Ferretería Central",
    concept: "Mantenimiento",
    amount: 3150,
    status: "pagada",
    date: "2026-07-02",
  },
];

export const sampleEmployees = [
  {
    id: 1,
    name: "Ana Torres",
    role: "Gerente de tienda",
    status: "activo",
    monthlyPay: 18000,
    startDate: "2023-02-01",
  },
  {
    id: 2,
    name: "Luis Hernández",
    role: "Cajero",
    status: "activo",
    monthlyPay: 9500,
    startDate: "2024-06-15",
  },
  {
    id: 3,
    name: "Marta Gómez",
    role: "Almacén",
    status: "vacaciones",
    monthlyPay: 10200,
    startDate: "2022-11-03",
  },
];

export const salesPipeline = [
  {
    stage: "Prospecto",
    deals: [
      { name: "Café Aroma", value: 24000 },
      { name: "Tienda Luna", value: 15800 },
    ],
  },
  { stage: "Cotización", deals: [{ name: "Ferretería Central", value: 9800 }] },
  { stage: "Pedido", deals: [{ name: "Distribuidora Sol", value: 32500 }] },
  { stage: "Cobrado", deals: [{ name: "Panadería Trigo", value: 12300 }] },
];

export const cartera = [
  { client: "Café Aroma", status: "al corriente", amount: 8200, dueDate: "2026-08-05" },
  { client: "Tienda Luna", status: "por vencer", amount: 4300, dueDate: "2026-07-25" },
  { client: "Panadería Trigo", status: "vencida", amount: 2100, dueDate: "2026-07-10" },
];
