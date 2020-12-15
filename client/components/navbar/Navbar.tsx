import React, { useEffect } from 'react'
import Link from 'next/link'

import { authApi } from 'api/auth'

export const Navbar = () => {
  const logout = async () => {
    await authApi.logout()

    window.location.reload()
  }

  const getMe = async () => {
    const { data } = await authApi.getMe()

    console.log(data)
  }

  useEffect(() => {
    getMe()
  }, [])

  return (
    <div className="flex justify-between items-center py-5 px-10 bg-blue-400 text-white">
      <Link href="/">
        <p className="text-2xl font-bold">Shop</p>
      </Link>
      <button className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 transition" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
