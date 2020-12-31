import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetGameGroupsInput = Pick<Prisma.FindManyGameGroupArgs, "where" | "orderBy" | "skip" | "take">

export default async function getGameGroups(
  { where, orderBy, skip = 0, take }: GetGameGroupsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const gameGroups = await db.gameGroup.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.gameGroup.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    gameGroups,
    nextPage,
    hasMore,
    count,
  }
}
