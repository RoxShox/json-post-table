import React from "react"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { changeSearch, setPage } from "../../store/posts/posts.slice"
import { useDispatch } from "react-redux"
import { setPageToURL } from "../../utils/history"
import { css } from "@emotion/css"

const SearchInput = () => {
	const { search } = useSelector((state: RootState) => state.posts)
	const dispatch = useDispatch<AppDispatch>()

	const searchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPageToURL(1)
		dispatch(setPage(1))
		dispatch(changeSearch(e.target.value))
	}

	return (
		<div className={inputWrap}>
			<label>
				<input
					type="text"
					placeholder="Поиск"
					className={inputSearch}
					value={search}
					onChange={searchItem}
				/>
			</label>
		</div>
	)
}

const inputSearch = css`
	display: block;
	width: 100%;
	color: #b3b7bf;
	background-color: #5a5c66;
	border: none;
	padding: 15px 25px;
	width: -webkit-fill-available;
	outline: none;
	::placeholder {
		color: #b3b7bf;
	}
`

const inputWrap = css`
	margin-bottom: 15px;
	max-width: 631px;
`

export default SearchInput
