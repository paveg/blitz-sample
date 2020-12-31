import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getRule from "app/rules/queries/getRule"
import deleteRule from "app/rules/mutations/deleteRule"

export const Rule = () => {
  const router = useRouter()
  const ruleId = useParam("ruleId", "number")
  const [rule] = useQuery(getRule, { where: { id: ruleId } })
  const [deleteRuleMutation] = useMutation(deleteRule)

  return (
    <div>
      <h1>Rule {rule.id}</h1>
      <pre>{JSON.stringify(rule, null, 2)}</pre>

      <Link href={`/rules/${rule.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRuleMutation({ where: { id: rule.id } })
            router.push("/rules")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowRulePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/rules">
          <a>Rules</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Rule />
      </Suspense>
    </div>
  )
}

ShowRulePage.getLayout = (page) => <Layout title={"Rule"}>{page}</Layout>

export default ShowRulePage
