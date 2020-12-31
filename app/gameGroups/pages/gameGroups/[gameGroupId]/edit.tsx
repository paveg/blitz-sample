import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getGameGroup from "app/game-groups/queries/getGameGroup"
import updateGameGroup from "app/game-groups/mutations/updateGameGroup"
import GameGroupForm from "app/game-groups/components/GameGroupForm"

export const EditGameGroup = () => {
  const router = useRouter()
  const gameGroupId = useParam("gameGroupId", "number")
  const [gameGroup, { setQueryData }] = useQuery(getGameGroup, { where: { id: gameGroupId } })
  const [updateGameGroupMutation] = useMutation(updateGameGroup)

  return (
    <div>
      <h1>Edit GameGroup {gameGroup.id}</h1>
      <pre>{JSON.stringify(gameGroup)}</pre>

      <GameGroupForm
        initialValues={gameGroup}
        onSubmit={async () => {
          try {
            const updated = await updateGameGroupMutation({
              where: { id: gameGroup.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/gameGroups/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing gameGroup " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditGameGroupPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGameGroup />
      </Suspense>

      <p>
        <Link href="/gameGroups">
          <a>GameGroups</a>
        </Link>
      </p>
    </div>
  )
}

EditGameGroupPage.getLayout = (page) => <Layout title={"Edit GameGroup"}>{page}</Layout>

export default EditGameGroupPage
