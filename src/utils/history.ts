import { createBrowserHistory } from "history"

const history = createBrowserHistory()

export function setPageToURL(page: number) {
	const url = new URL(window.location.href)
	url.searchParams.set("page", String(page))
	history.replace(url.pathname + url.search, {})
}
