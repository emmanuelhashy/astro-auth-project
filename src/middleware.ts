import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

const notAuthenticatedRoutes = ["/login", "/register"];

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect, request }, next) => {
    console.log("Middleware triggered");
    const session = await getSession(request);
    const isLoggedIn = !!session;
    const user = session?.user;

    locals.isLoggedIn = isLoggedIn;
    locals.user = null;
    locals.isAdmin = false;

    if (isLoggedIn && user) {
      locals.user = {
        name: user.name!,
        email: user.email!,
      };

      locals.isAdmin = user.role === "admin";
    }

    if (!locals.isAdmin && url.pathname.startsWith("/admin")) {
      return redirect("/");
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect("/");
    }

    return next();
  }
);
