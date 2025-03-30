import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env";

export const inquryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.inqury.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
        },
      });
    }),

  list: publicProcedure
    .input(
      z.object({
        password: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.password === env.ADMIN_PASSWORD) {
        const inquries = await ctx.db.inqury.findMany();

        return {
          status: "success",
          message: null,
          data: inquries,
        };
      } else {
        return {
          status: "error",
          message: "Incorrect password.",
          data: null,
        };
      }
    }),
});
