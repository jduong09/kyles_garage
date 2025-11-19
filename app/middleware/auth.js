import { redirect } from "react-router";

export async function authMiddleware({ request, context }) {
  console.log('Ran middleware function');
  // Replace with your real session/auth check
  const res = await fetch("/api/me", { credentials: "include" });

  let user = null;
  if (res.ok) {
    user = await res.json();
  }

  if (!user) {
    throw redirect("/login");
  }

  // make user available to loaders + components
  context.user = user;
}