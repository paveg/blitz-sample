import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetGamesInput = Pick<Prisma.FindManyGameArgs, "where" | "orderBy" | "skip" | "take">

export default async function getGames(
  { where, orderBy, skip = 0, take }: GetGamesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const games = await db.game.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.game.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    games,
    nextPage,
    hasMore,
    count,
  }
}
