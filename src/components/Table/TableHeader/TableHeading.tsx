import { setFilter } from "../../../store/posts/posts.slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../store/store"
import { css } from "@emotion/css"
import { ReactComponent as IconArrow } from "../../../assets/arrow.svg"
import { useTypedSelector } from "../../../hooks/useTypedSelector"

type TableItemProps = {
	title: string
	sortName: "id" | "title" | "body"
}

const TableHeading = ({ title, sortName }: TableItemProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const { filters } = useTypedSelector((state) => state.posts)

	const currentFilter = filters[sortName]

	const toogleSortMethod = () => {
		dispatch(setFilter({ name: sortName }))
	}

	return (
		<th onClick={toogleSortMethod} className={tableHeading}>
			<div className={tableHeadingWrap}>
				{title}
				<IconArrow
					style={{
						transform: currentFilter === "desc" ? "rotate(180deg)" : "none",
					}}
				/>
			</div>
		</th>
	)
}

const tableHeading = css`
	padding: 15px;
	background: #474955;
	border: 1px solid #474955;
`
const tableHeadingWrap = css`
	font-weight: 500;
	line-height: auto;
	color: #ffffff;
	display: flex;
	column-gap: 32px;
	align-items: center;
`

export default TableHeading
