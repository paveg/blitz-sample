import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateRuleInput = Pick<Prisma.RuleUpdateArgs, "where" | "data">

export default async function updateRule({ where, data }: UpdateRuleInput, ctx: Ctx) {
  ctx.session.authorize()

  const rule = await db.rule.update({ where, data })

  return rule
}
