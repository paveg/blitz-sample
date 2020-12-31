import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetRuleInput = Pick<Prisma.FindFirstRuleArgs, "where">

export default async function getRule({ where }: GetRuleInput, ctx: Ctx) {
  ctx.session.authorize()

  const rule = await db.rule.findFirst({ where })

  if (!rule) throw new NotFoundError()

  return rule
}
