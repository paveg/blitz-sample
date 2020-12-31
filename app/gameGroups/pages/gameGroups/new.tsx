import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createGameGroup from "app/gameGroups/mutations/createGameGroup"
import GameGroupForm from "app/gameGroups/components/GameGroupForm"

const NewGameGroupPage: BlitzPage = () => {
  const router = useRouter()
  const [createGameGroupMutation] = useMutation(createGameGroup)

  return (
    <div>
      <h1>Create New GameGroup</h1>

      <GameGroupForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const gameGroup = await createGameGroupMutation({ data: {} })
            alert("Success!" + JSON.stringify(gameGroup))
            router.push(`/gameGroups/${gameGroup.id}`)
          } catch (error) {
            alert("Error creating gameGroup " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/gameGroups">
          <a>GameGroups</a>
        </Link>
      </p>
    </div>
  )
}

NewGameGroupPage.getLayout = (page) => <Layout title={"Create New GameGroup"}>{page}</Layout>

export default NewGameGroupPage
