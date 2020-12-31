import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetRulesInput = Pick<Prisma.FindManyRuleArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRules(
  { where, orderBy, skip = 0, take }: GetRulesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const rules = await db.rule.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.rule.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    rules,
    nextPage,
    hasMore,
    count,
  }
}
