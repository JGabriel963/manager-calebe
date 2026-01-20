import prisma from "@/lib/db";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const participantsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await prisma.person.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        points: true,
        checkins: true,
      },
    });
  }),
  create: baseProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.person.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          address: input.address,
        },
      });
    }),
  delete: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.person.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.person.findUnique({
        where: {
          id: input.id,
        },
        include: {
          points: true,
          checkins: true,
        },
      });
    }),
  addCheckin: baseProcedure
    .input(
      z.object({
        id: z.string(),
        points: z.number(),
        date: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.checkin.create({
        data: {
          personId: input.id,
          checkedAt: input.date,
          points: {
            create: {
              personId: input.id,
              points: input.points,
              type: "CHECKIN",
            },
          },
        },
      });
    }),
  removeCheckin: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.checkin.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
