'use client'

import AppTable from "@/component/app.table"
import useSWR from "swr";

const BlogPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })

  if (isLoading) {
    return <div>Is loading...</div>
  }

  return (
    <div className="mt-3">
      <AppTable
        blogs={data}
      />
    </div>
  )
}

export default BlogPage