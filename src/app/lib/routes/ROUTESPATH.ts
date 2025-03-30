const DASHBOARD = "/dashboard";

const ROUTES = {
  MANAGEMENT: {
    USERS: `${DASHBOARD}/management/users`,
    PROFILES: `${DASHBOARD}/management/profiles`,
    PERMISSIONS: `${DASHBOARD}/management/permissions`,
  },
  PROFILE: "/profile",
  SETTINGS: "/settings",
  LOGIN: "/login",
  HOME: DASHBOARD,
};

export default ROUTES;