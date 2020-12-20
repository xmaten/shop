import Link from 'next/link'

export const AdminSidebar = () => {
  const routes = [
    {
      link: '/admin/products/all',
      label: 'All products',
    },
    {
      link: '/admin/products/create',
      label: 'Create product',
    },
  ]
  return (
    <div className="w-1/6 p-4 flex flex-col border-solid border-black border-r min-h-screen mr-5">
      {routes.map((route) => (
        <Link key={route.link} href={route.link}>
          <a className="mb-3">{route.label}</a>
        </Link>
      ))}
    </div>
  )
}
