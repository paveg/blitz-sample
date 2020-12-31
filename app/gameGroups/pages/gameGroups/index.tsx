import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getGameGroups from "app/gameGroups/queries/getGameGroups"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const GameGroupsList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ gameGroups, hasMore }] = usePaginatedQuery(getGameGroups, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {gameGroups.map((gameGroup) => (
          <li key={gameGroup.id}>
            <Link href={`/gameGroups/${gameGroup.id}`}>
              <a>{gameGroup.id}</a>
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

const GameGroupsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/gameGroups/new">
          <a>Create GameGroup</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <GameGroupsList />
      </Suspense>
    </div>
  )
}

GameGroupsPage.getLayout = (page) => <Layout title={"GameGroups"}>{page}</Layout>

export default GameGroupsPage
