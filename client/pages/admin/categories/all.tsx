import { useQuery } from 'react-query'
import Link from 'next/link'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { categoriesApi } from 'api/categories'

const AllCategories = () => {
  const { data, isLoading, isError } = useQuery('categories', categoriesApi.getAllCategories)

  const renderCategoriesResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    return (
      <ul>
        {data?.data.map((category) => (
          <li key={category.id} className="my-5 font-bold">
            {category.name} - <Link href={`/admin/categories/edit/${category.id}`}>EDIT</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">
        <Link href="/admin/categories/create">
          <a className="mt-5 mb-10 mr-10 font-bold block text-right">Create new category</a>
        </Link>
        {renderCategoriesResponse()}
      </div>
    </AdminWrapper>
  )
}

export default AllCategories
