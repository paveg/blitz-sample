import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createGame from "app/games/mutations/createGame"
import GameForm from "app/games/components/GameForm"
import { useCurrentUser } from "../../../hooks/useCurrentUser"

const NewGamePage: BlitzPage = () => {
  const router = useRouter()
  const [createGameMutation] = useMutation(createGame)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Game</h1>

      <GameForm
        initialValues={{}}
        onSubmit={async (event) => {
          if (currentUser) {
            try {
              const game = await createGameMutation({
                data: {
                  headCount: parseInt(event.target[0].value),
                  rank: parseInt(event.target[1].value),
                  score: parseInt(event.target[2].value),
                  gameGroup: { connect: { id: parseInt(event.target[3].value) } },
                  user: { connect: { id: currentUser.id } },
                },
              })
              alert("Success!" + JSON.stringify(game))
              router.push(`/games/${game.id}`)
            } catch (error) {
              alert("Error creating game " + JSON.stringify(error, null, 2))
            }
          }
        }}
      />

      <p>
        <Link href="/games">
          <a>Games</a>
        </Link>
      </p>
    </div>
  )
}

NewGamePage.getLayout = (page) => <Layout title={"Create New Game"}>{page}</Layout>

export default NewGamePage
