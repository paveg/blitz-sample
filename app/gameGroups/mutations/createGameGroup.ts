import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateGameGroupInput = Pick<Prisma.GameGroupCreateArgs, "data">
export default async function createGameGroup({ data }: CreateGameGroupInput, ctx: Ctx) {
  ctx.session.authorize()

  const gameGroup = await db.gameGroup.create({ data })

  return gameGroup
}
