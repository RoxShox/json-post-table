import React, { useEffect } from "react"
import {
	Post,
	nextPage,
	prevPage,
	setPage,
} from "../../../store/posts/posts.slice"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store/store"
import { useDispatch } from "react-redux"
import { useTable } from "../../../hooks/useTable"
import { css, cx } from "@emotion/css"
import ButtonStep from "../../../ui/ButtonStep/ButtonStep"
import { useTypedSelector } from "../../../hooks/useTypedSelector"

const TableFooter = () => {
	const { rangePages } = useTable()
	const { page } = useTypedSelector((state) => state.posts)
	const dispatch = useDispatch<AppDispatch>()
	const arr = Array(rangePages)
		.fill(0)
		.map((e, i) => i + 1)

	const controlPrevStep = () => {
		if (page === 1) {
			return
		}
		dispatch(prevPage())
	}

	const controlNextStep = () => {
		if (page === rangePages) {
			return
		}
		dispatch(nextPage())
	}

	return (
		<div className={tableFooter}>
			<ButtonStep title="Назад" handleClick={controlPrevStep} />

			<div>
				{arr.map((el, i) => (
					<button
						className={cx(btnPage, el === page && btnPageActive)}
						onClick={() => dispatch(setPage(el))}
						key={el}
					>
						{el}
					</button>
				))}
			</div>
			<ButtonStep title="Вперед" handleClick={controlNextStep} />
		</div>
	)
}

const btnPageActive = css`
	color: #7ebc3c;
`
const btnPage = css`
	border: none;
	background: transparent;
	color: #474955;
	cursor: pointer;
	font-size: 18px;
	font-style: italic;
	font-weight: 700;
	line-height: 137.687%;
	@media (max-width: 600px) {
		font-size: 14px;
	}
`
const tableFooter = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 41px;
	margin-top: 16px;
	@media (max-width: 600px) {
		padding: 0;
	}
`

export default TableFooter
