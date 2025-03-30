import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const inquryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), phone: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.inqury.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message
        },
      });
    }),
});
