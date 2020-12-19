import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { authApi } from 'api/auth'

export const useIsAdmin = () => {
  const router = useRouter()
  const { data } = useQuery('me', authApi.getMe)

  useEffect(() => {
    if (data?.data && data?.data.role !== 'admin') {
      router.push('/login')
    }
  }, [data?.data])
}
