import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteGameGroupInput = Pick<Prisma.GameGroupDeleteArgs, "where">

export default async function deleteGameGroup({ where }: DeleteGameGroupInput, ctx: Ctx) {
  ctx.session.authorize()

  const gameGroup = await db.gameGroup.delete({ where })

  return gameGroup
}
