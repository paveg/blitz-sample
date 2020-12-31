import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createRule from "app/rules/mutations/createRule"
import RuleForm from "app/rules/components/RuleForm"

const NewRulePage: BlitzPage = () => {
  const router = useRouter()
  const [createRuleMutation] = useMutation(createRule)

  return (
    <div>
      <h1>Create New Rule</h1>

      <RuleForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const rule = await createRuleMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(rule))
            router.push(`/rules/${rule.id}`)
          } catch (error) {
            alert("Error creating rule " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/rules">
          <a>Rules</a>
        </Link>
      </p>
    </div>
  )
}

NewRulePage.getLayout = (page) => <Layout title={"Create New Rule"}>{page}</Layout>

export default NewRulePage
