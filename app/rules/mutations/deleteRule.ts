import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteRuleInput = Pick<Prisma.RuleDeleteArgs, "where">

export default async function deleteRule({ where }: DeleteRuleInput, ctx: Ctx) {
  ctx.session.authorize()

  const rule = await db.rule.delete({ where })

  return rule
}
