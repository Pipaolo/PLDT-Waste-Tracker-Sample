// TODO: Change the hostname to whatever hosting
export const hostname =
  process.env.NODE_ENV === "production"
    ? "https://pldt-waste-tracker.vercel.app/"
    : "http://localhost:3000";
