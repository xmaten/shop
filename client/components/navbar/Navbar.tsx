import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

import { authApi } from 'api/auth'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '10px 30px',
    },
  }),
)

export const Navbar = () => {
  const classes = useStyles()

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
    <AppBar position="static" className={classes.root}>
      <Link href="/">
        <div>Shop</div>
      </Link>
      <Button onClick={() => logout()}>Logout</Button>
    </AppBar>
  )
}
