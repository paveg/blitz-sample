import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateGameGroupInput = Pick<Prisma.GameGroupUpdateArgs, "where" | "data">

export default async function updateGameGroup({ where, data }: UpdateGameGroupInput, ctx: Ctx) {
  ctx.session.authorize()

  const gameGroup = await db.gameGroup.update({ where, data })

  return gameGroup
}
