import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getGame from "app/games/queries/getGame"
import updateGame from "app/games/mutations/updateGame"
import GameForm from "app/games/components/GameForm"

export const EditGame = () => {
  const router = useRouter()
  const gameId = useParam("gameId", "number")
  const [game, { setQueryData }] = useQuery(getGame, { where: { id: gameId } })
  const [updateGameMutation] = useMutation(updateGame)

  return (
    <div>
      <h1>Edit Game {game.id}</h1>
      <pre>{JSON.stringify(game)}</pre>

      <GameForm
        initialValues={game}
        onSubmit={async () => {
          try {
            const updated = await updateGameMutation({
              where: { id: game.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/games/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing game " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditGamePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGame />
      </Suspense>

      <p>
        <Link href="/games">
          <a>Games</a>
        </Link>
      </p>
    </div>
  )
}

EditGamePage.getLayout = (page) => <Layout title={"Edit Game"}>{page}</Layout>

export default EditGamePage
