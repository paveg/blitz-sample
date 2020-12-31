import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateGameInput = Pick<Prisma.GameUpdateArgs, "where" | "data">

export default async function updateGame({ where, data }: UpdateGameInput, ctx: Ctx) {
  ctx.session.authorize()

  const game = await db.game.update({ where, data })

  return game
}
