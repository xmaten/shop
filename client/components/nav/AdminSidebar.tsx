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
    <aside
      className="w-1/6 p-4 flex flex-col border-solid border-black border-r mr-5"
      style={{ height: 'calc(100vh - 88px)' }}
    >
      {routes.map((route) => (
        <Link key={route.link} href={route.link}>
          <a className="mb-3">{route.label}</a>
        </Link>
      ))}
    </aside>
  )
}