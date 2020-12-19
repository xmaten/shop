import React, { useEffect } from 'react'
import Link from 'next/link'

import { authApi } from 'api/auth'
import { useMutation } from 'react-query'

export const Navbar = () => {
  const logoutMutation = useMutation(authApi.logout, {
    onSuccess: () => {
      window.location.reload()
    },
    onError: (error) => {
      console.log('this is error', error)
    },
  })

  const getMe = async () => {
    const { data } = await authApi.getMe()
  }

  useEffect(() => {
    getMe()
  }, [])

  return (
    <div className="flex justify-between items-center py-5 px-10 bg-blue-400 text-white">
      <Link href="/">
        <p className="text-2xl font-bold">Shop</p>
      </Link>
      <button
        className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 transition"
        onClick={() => logoutMutation.mutate()}
      >
        Logout
      </button>
    </div>
  )
}
