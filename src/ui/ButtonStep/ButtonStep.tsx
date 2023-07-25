import React from "react"
import { AppDispatch } from "../../store/store"
import { useDispatch } from "react-redux"
import { css } from "@emotion/css"
type ButtonStepProps = {
	title: string
	handleClick: () => void
}

const ButtonStep = ({ title, handleClick }: ButtonStepProps) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<button className={btn} onClick={() => dispatch(handleClick)}>
			{title}
		</button>
	)
}

const btn = css`
	color: #474955;
	font-size: 24px;
	font-weight: 500;
	line-height: 137.687%;
	border: none;
	background: transparent;
	cursor: pointer;
	@media (max-width: 600px) {
		font-size: 14px;
	}
`

export default ButtonStep
