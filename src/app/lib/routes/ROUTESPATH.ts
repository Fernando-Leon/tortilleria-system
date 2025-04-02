const DASHBOARD = "/dashboard";

const ROUTES = {
  MANAGEMENT: {
    PROFILES: `${DASHBOARD}/gestion/profiles`,
    PERMISSIONS: `${DASHBOARD}/gestion/permissions`,
  },
  VENTAS: {
    VENTAS: `${DASHBOARD}/ventas`,
    PEDIDOS: `${DASHBOARD}/ventas/pedidos`,
    FACTURAS: `${DASHBOARD}/ventas/facturas`,
    REGISTRAR: `${DASHBOARD}/ventas/pedidos/registrar`,
    EMITIDAS: `${DASHBOARD}/ventas/facturacion/detalles/emitidas`,
    GENERAR: `${DASHBOARD}/ventas/facturacion/detalles/generar`,
    USERS: `${DASHBOARD}/ventas/facturacion/detalles/users`,
  },
  PROFILE: "/profile",
  SETTINGS: "/settings",
  LOGIN: "/login",
  HOME: DASHBOARD,
};

export default ROUTES;