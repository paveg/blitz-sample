import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getGames from "app/games/queries/getGames"
import { useCurrentUser } from "../../../hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const GamesList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const page = Number(router.query.page) || 0
  const [{ games, hasMore }] = usePaginatedQuery(getGames, {
    orderBy: { id: "asc" },
    where: { userId: currentUser?.id },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/games/${game.id}`}>
              <a>{game.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const GamesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/games/new">
          <a>Create Game</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <GamesList />
      </Suspense>
    </div>
  )
}

GamesPage.getLayout = (page) => <Layout title={"Games"}>{page}</Layout>

export default GamesPage
