import React from "react"
import { Post } from "../../../store/posts/posts.slice"
import { css } from "@emotion/css"
type TableRowProps = {
	item: Post
}
const TableRow = ({ item }: TableRowProps) => {
	return (
		<tr>
			<td
				style={{ width: "10%", textAlign: "center" }}
				className={tableItemInRow}
			>
				{item.id}
			</td>
			<td style={{ width: "50%" }} className={tableItemInRow}>
				{item.title}
			</td>
			<td style={{ width: "40%" }} className={tableItemInRow}>
				{item.body}
			</td>
		</tr>
	)
}

const tableItemInRow = css`
	border: 1px solid #e3e6ec;
	font-weight: 500;
	font-size: 14px;
	padding: 15px;
	color: #474955;
	@media (max-width: 600px) {
		font-size: 11px;
	}
`

export default TableRow
