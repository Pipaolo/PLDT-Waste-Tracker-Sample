// TODO: Change the hostname to whatever hosting
export const hostname =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000"
    : "http://localhost:3000";
