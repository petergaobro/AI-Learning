import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        // (str) => !str.includes(`${process.env.DATABASE_URL}`),
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    // Add ` on ID and SECRET if you want to make sure they're not empty
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    /**Watsonx assistant windows */
    NEXT_PUBLIC_WATSONX_INTEGRATIONID: z.string(),
    NEXT_PUBLIC_WATSONX_REGION: z.string(),
    NEXT_PUBLIC_WATSONX_SERVICEINSTANCEID: z.string(),
    /** cloud object storage (COS)*/
    NEXT_PUBLIC_IBM_IAM_SERVER: z.string(),
    NEXT_PUBLIC_IBM_COS_APIKEY: z.string(),
    NEXT_PUBLIC_IBM_COS_RSC_SERV_INST_ID: z.string(),
    NEXT_PUBLIC_IBM_COS_AUTH_ENDPOINT: z.string(),
    NEXT_PUBLIC_IBM_COS_ENDPOINT: z.string(),
    /** d-id implement */
    NEXT_PUBLIC_D_ID_API_KEY: z.string(),
    NEXT_PUBLIC_D_ID_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    /**Watsonx assistant windows */
    NEXT_PUBLIC_WATSONX_INTEGRATIONID: process.env.NEXT_PUBLIC_WATSONX_INTEGRATIONID,
    NEXT_PUBLIC_WATSONX_REGION: process.env.NEXT_PUBLIC_WATSONX_REGION,
    NEXT_PUBLIC_WATSONX_SERVICEINSTANCEID: process.env.NEXT_PUBLIC_WATSONX_SERVICEINSTANCEID,
    /**cloud object storage (COS) */
    NEXT_PUBLIC_IBM_IAM_SERVER: process.env.NEXT_PUBLIC_IBM_IAM_SERVER,
    NEXT_PUBLIC_IBM_COS_APIKEY: process.env.NEXT_PUBLIC_IBM_COS_APIKEY,
    NEXT_PUBLIC_IBM_COS_RSC_SERV_INST_ID: process.env.NEXT_PUBLIC_IBM_COS_RSC_SERV_INST_ID,
    NEXT_PUBLIC_IBM_COS_AUTH_ENDPOINT: process.env.NEXT_PUBLIC_IBM_COS_AUTH_ENDPOINT,
    NEXT_PUBLIC_IBM_COS_ENDPOINT: process.env.NEXT_PUBLIC_IBM_COS_ENDPOINT,
    /** d-id implement */
    NEXT_PUBLIC_D_ID_API_KEY: process.env.NEXT_PUBLIC_D_ID_API_KEY,
    NEXT_PUBLIC_D_ID_URL: process.env.NEXT_PUBLIC_D_ID_URL,

  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
