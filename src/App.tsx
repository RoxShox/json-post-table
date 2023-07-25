import { useEffect } from "react"
import TableFooter from "./components/Table/TableFooter/TableFooter"
import SearchInput from "./components/SearchInput/SearchInput"
import { fetchPosts } from "./store/posts/posts.actions"
import { AppDispatch } from "./store/store"
import { useDispatch } from "react-redux"
import { setPageToURL } from "./utils/history"
import TableHeading from "./components/Table/TableHeader/TableHeading"
import TableRow from "./components/Table/TableBody/TableRow"
import { css } from "@emotion/css"
import { useTypedSelector } from "./hooks/useTypedSelector"
function App() {
	const { posts, limit, page, isLoading, search, sortName, sortMethod } =
		useTypedSelector((state) => state.posts)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		setPageToURL(page)
		dispatch(
			fetchPosts({
				page,
				limit,
				q: search,
				sortName,
				sortMethod,
			})
		)
	}, [page, search, sortName, sortMethod])

	return (
		<div className={main}>
			<div className={container}>
				<div className="table-wrap">
					<SearchInput />
					{isLoading ? (
						<h1 style={{ textAlign: "center" }}>Загрузка...</h1>
					) : (
						<table className={table}>
							<thead>
								<tr>
									<TableHeading title="id" sortName="id" />
									<TableHeading title="Заголовок" sortName="title" />
									<TableHeading title="Описание" sortName="body" />
								</tr>
							</thead>
							<tbody>
								{posts?.map((el) => (
									<TableRow item={el} key={el.id} />
								))}
							</tbody>
						</table>
					)}
					{posts.length === 0 && !isLoading && (
						<h2 style={{ textAlign: "center" }}>Посты были не найдены</h2>
					)}
				</div>
				<TableFooter />
			</div>
		</div>
	)
}
const table = css`
	border: 1px solid #dddddd;
	border-collapse: collapse;
	width: 100%;
`
const container = css`
	max-width: 1080px;
	margin: 0 auto;
	padding: 0 15px;
`
const main = css`
	padding: 23px 0 13px;
`

export default App
