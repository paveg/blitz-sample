import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetGameGroupInput = Pick<Prisma.FindFirstGameGroupArgs, "where">

export default async function getGameGroup({ where }: GetGameGroupInput, ctx: Ctx) {
  ctx.session.authorize()

  const gameGroup = await db.gameGroup.findFirst({ where })

  if (!gameGroup) throw new NotFoundError()

  return gameGroup
}
