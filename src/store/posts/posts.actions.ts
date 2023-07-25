import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Post } from "./posts.slice"
import { SortState } from "../../types/common"

type FetchPostsProps = {
	limit: number
	page: number
	q: string
	sortName: string
	sortMethod: SortState
}

export const fetchPosts = createAsyncThunk(
	"fetch/posts",
	async ({ limit, page, q, sortName, sortMethod }: FetchPostsProps) => {
		const urlStr = [
			`https://jsonplaceholder.typicode.com/posts`,
			`?_page=${page}`,
			`&_limit=${limit}`,
			`&q=${q}`,
			`&_sort=${sortName}`,
			`&_order=${sortMethod}`,
		].join("")
		const { data, headers } = await axios<Post[]>(urlStr)
		return { data, totalCount: headers["x-total-count"] }
	}
)
