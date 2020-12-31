import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateRuleInput = Pick<Prisma.RuleCreateArgs, "data">
export default async function createRule({ data }: CreateRuleInput, ctx: Ctx) {
  ctx.session.authorize()

  const rule = await db.rule.create({ data })

  return rule
}
