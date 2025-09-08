let url = new URL("https://www.youtube.com/results?search_query=http+mthods&pageNo=three+and+four")

console.log(url)
console.log(url.search)
console.log(url.searchParams.get("search_query"))