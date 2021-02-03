import { useRouter } from 'next/router'

type Props = {
  totalPages: number
  currentPage: number
}

export const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  const router = useRouter()

  const changePage = (page: number) => {
    router.push(
      `?field=${router.query.field || 'name'}&direction=${router.query.direction || 'ASC'}&priceMin=${
        router.query.priceMin || 0
      }&priceMax=${router.query.priceMax || 99999}&page=${page}`,
    )
  }
  return (
    <div className="flex justify-center mt-5">
      {Array.from(Array(totalPages)).map((_, index) => (
        <button
          onClick={() => changePage(index + 1)}
          className={`mx-5 text-xl cursor-pointer ${currentPage === index + 1 ? 'font-bold' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
