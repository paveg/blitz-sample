import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteGameInput = Pick<Prisma.GameDeleteArgs, "where">

export default async function deleteGame({ where }: DeleteGameInput, ctx: Ctx) {
  ctx.session.authorize()

  const game = await db.game.delete({ where })

  return game
}
