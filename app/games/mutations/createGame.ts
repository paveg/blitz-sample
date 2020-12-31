import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateGameInput = Pick<Prisma.GameCreateArgs, "data">
export default async function createGame({ data }: CreateGameInput, ctx: Ctx) {
  ctx.session.authorize()

  const game = await db.game.create({ data })

  return game
}
