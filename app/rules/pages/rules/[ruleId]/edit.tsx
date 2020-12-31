import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getRule from "app/rules/queries/getRule"
import updateRule from "app/rules/mutations/updateRule"
import RuleForm from "app/rules/components/RuleForm"

export const EditRule = () => {
  const router = useRouter()
  const ruleId = useParam("ruleId", "number")
  const [rule, { setQueryData }] = useQuery(getRule, { where: { id: ruleId } })
  const [updateRuleMutation] = useMutation(updateRule)

  return (
    <div>
      <h1>Edit Rule {rule.id}</h1>
      <pre>{JSON.stringify(rule)}</pre>

      <RuleForm
        initialValues={rule}
        onSubmit={async () => {
          try {
            const updated = await updateRuleMutation({
              where: { id: rule.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/rules/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing rule " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditRulePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRule />
      </Suspense>

      <p>
        <Link href="/rules">
          <a>Rules</a>
        </Link>
      </p>
    </div>
  )
}

EditRulePage.getLayout = (page) => <Layout title={"Edit Rule"}>{page}</Layout>

export default EditRulePage
