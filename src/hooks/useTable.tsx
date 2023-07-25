import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export const useTable = () => {
	const { totalCount, limit } = useSelector((state: RootState) => state.posts)
	const rangePages = Math.ceil(totalCount / limit)

	return { rangePages }
}
