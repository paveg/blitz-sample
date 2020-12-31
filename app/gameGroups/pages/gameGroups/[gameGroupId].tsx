import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getGameGroup from "app/gameGroups/queries/getGameGroup"
import deleteGameGroup from "app/gameGroups/mutations/deleteGameGroup"

export const GameGroup = () => {
  const router = useRouter()
  const gameGroupId = useParam("gameGroupId", "number")
  const [gameGroup] = useQuery(getGameGroup, { where: { id: gameGroupId } })
  const [deleteGameGroupMutation] = useMutation(deleteGameGroup)

  return (
    <div>
      <h1>GameGroup {gameGroup.id}</h1>
      <pre>{JSON.stringify(gameGroup, null, 2)}</pre>

      <Link href={`/gameGroups/${gameGroup.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteGameGroupMutation({ where: { id: gameGroup.id } })
            router.push("/gameGroups")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowGameGroupPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/gameGroups">
          <a>GameGroups</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <GameGroup />
      </Suspense>
    </div>
  )
}

ShowGameGroupPage.getLayout = (page) => <Layout title={"GameGroup"}>{page}</Layout>

export default ShowGameGroupPage
