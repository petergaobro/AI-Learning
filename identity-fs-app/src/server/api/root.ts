// import { postRouter } from "~/server/api/routers/post";
import { registerRouter } from "./routers/user/register.router";
import { createTRPCRouter } from "~/server/api/trpc";
import { forgetPwdRouter } from "./routers/user/forgetPwd.router";
// import { userRouter } from "./routers/user/users.router";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  user: registerRouter,
  // users: userRouter,
  forget: forgetPwdRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
