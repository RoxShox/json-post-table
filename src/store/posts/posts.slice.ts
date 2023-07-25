import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "./posts.actions"
import { SortState } from "../../types/common"

const toggleFilter = (sort: SortState) => (sort === "asc" ? "desc" : "asc")

export type Post = {
	userId: number
	id: number
	title: string
	body: string
}

type FilterColumns = "id" | "body" | "title"

export interface PostsState {
	posts: Post[]
	isLoading: boolean
	error: null | boolean
	page: number
	totalCount: number
	limit: number
	search: string
	sortName: FilterColumns
	sortMethod: SortState
	filters: {
		id: SortState
		body: SortState
		title: SortState
	}
}

const defaultSort: SortState = "asc"

const initialState: PostsState = {
	posts: [],
	page: 1,
	sortName: "id",
	sortMethod: defaultSort,
	search: "",
	totalCount: 1,
	limit: 10,
	isLoading: true,
	error: false,

	filters: {
		id: defaultSort,
		title: defaultSort,
		body: defaultSort,
	},
}

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		nextPage: (state) => {
			state.page += 1
		},
		prevPage: (state) => {
			state.page -= 1
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		changeSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setFilter: (
			state,
			{ payload: { name } }: PayloadAction<{ name: FilterColumns }>
		) => {
			state.sortName = name

			const currentFilter = state.filters[name]
			const newFilterSortMethod = toggleFilter(currentFilter)

			state.sortMethod = newFilterSortMethod
			state.filters[name] = newFilterSortMethod
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.posts = action.payload.data
				state.totalCount = action.payload.totalCount
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.error = true
			})
	},
})

// Action creators are generated for each case reducer function
export const { nextPage, prevPage, changeSearch, setPage, setFilter } =
	postsSlice.actions
