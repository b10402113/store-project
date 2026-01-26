import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// 1. Add 'async' here
export default clerkMiddleware(async (auth, req) => {
  // 2. Use 'await auth()' to get the userId safely
  const { userId } = await auth();

  // Verify the ID matches
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3. Use '(await auth()).protect()'
  if (!isPublicRoute(req)) {
    (await auth()).protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
