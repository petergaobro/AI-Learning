import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    /** old */
    // onError:
    //   env.NODE_ENV === "development"
    //     ? ({ path, error }) => {
    //       console.error(
    //         `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
    //       );
    //     }
    //     : undefined,

    /** new */
    onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR' && env.NODE_ENV === "development") {
        console.error('Something went wrong', error)
      } else {
        console.error(error)
      }
    }
  });

export { handler as GET, handler as POST };
