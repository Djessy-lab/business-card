/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { router, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import slug from 'slug'

export const cardRouter = router({
  publishCard: privateProcedure.input(z.object({ website: z.string(), title: z.string() })).mutation(async ({ ctx, input }) => {
    const { email, image, name } = ctx.session.user
    const { title, website } = input

    if (!email || !image || !name) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const card = await ctx.prisma.businessCard.upsert({
      create: {
        title,
        website,
        email,
        imgSrc: image,
        name,
        slug: slug(name)
      },
      update: {
        title,
        website,
        email,
        imgSrc: image,
        name,
        slug: slug(name)
      },
      where: {
        slug: slug(name)
      }
    })

    return card
  }),

  getCard: publicProcedure.input(z.object({slug: z.string()})).query(async ({ctx, input}) => {
    const {slug} = input
    const card = await ctx.prisma.businessCard.findUnique({
      where: {
        slug
      }
    })

    return card
  }),
});
