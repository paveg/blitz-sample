import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetGameInput = Pick<Prisma.FindFirstGameArgs, "where">

export default async function getGame({ where }: GetGameInput, ctx: Ctx) {
  ctx.session.authorize()

  const game = await db.game.findFirst({ where })

  if (!game) throw new NotFoundError()

  return game
}
