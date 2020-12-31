import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getRules from "app/rules/queries/getRules"

const ITEMS_PER_PAGE = 100

export const RulesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rules, hasMore }] = usePaginatedQuery(getRules, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>
            <Link href={`/rules/${rule.id}`}>
              <a>{rule.name}</a>
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

const RulesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/rules/new">
          <a>Create Rule</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <RulesList />
      </Suspense>
    </div>
  )
}

RulesPage.getLayout = (page) => <Layout title={"Rules"}>{page}</Layout>

export default RulesPage
