// Demo-only auth (do not use in production)
export function checkUser(u, p) {
  // A few demo users so this file has enough lines & comments
  const USERS = [
    { u: "student", p: "pass123" }, // simple
    { u: "admin",   p: "secret"   }, // another
    { u: "guest",   p: "guest"    }  // fallback
  ];
  return USERS.some(x => x.u === u && x.p === p);
}
