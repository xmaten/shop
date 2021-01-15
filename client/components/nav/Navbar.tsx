import React from 'react'
import Link from 'next/link'

import { authApi } from 'api/auth'
import { useMutation, useQuery } from 'react-query'

export const Navbar = () => {
  const logoutMutation = useMutation(authApi.logout, {
    onSuccess: () => {
      window.location.reload()
    },
  })

  const { data } = useQuery('me', authApi.getMe)

  return (
    <div className="flex justify-between items-center py-5 px-10 bg-blue-400 text-white">
      <Link href="/">
        <p className="text-2xl font-bold">Shop</p>
      </Link>
      {!data?.data.fullName && (
        <div>
          <Link href="/login">
            <a className="mr-5">Login</a>
          </Link>
          <Link href="/register">Register</Link>
        </div>
      )}

      {data?.data.fullName && (
        <div className="flex justify-center items-center">
          <Link href="/cart">
            <a className="mr-10">Cart</a>
          </Link>

          <Link href="/profile">
            <a className="mr-10">Profile</a>
          </Link>

          <button
            className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 transition outline-none"
            onClick={() => logoutMutation.mutate()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
