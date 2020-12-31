import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getGame from "app/games/queries/getGame"
import deleteGame from "app/games/mutations/deleteGame"

export const Game = () => {
  const router = useRouter()
  const gameId = useParam("gameId", "number")
  const [game] = useQuery(getGame, { where: { id: gameId } })
  const [deleteGameMutation] = useMutation(deleteGame)

  return (
    <div>
      <h1>Game {game.id}</h1>
      <pre>{JSON.stringify(game, null, 2)}</pre>

      <Link href={`/games/${game.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteGameMutation({ where: { id: game.id } })
            router.push("/games")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowGamePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/games">
          <a>Games</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Game />
      </Suspense>
    </div>
  )
}

ShowGamePage.getLayout = (page) => <Layout title={"Game"}>{page}</Layout>

export default ShowGamePage
