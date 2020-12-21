import Link from 'next/link'

type Props = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
  href?: string
  as?: string
}

export const Button: React.FC<Props> = ({ onClick, type = 'button', children, isDisabled = false, href, as }) => {
  const mainClasses = ` block flex justify-center px-5 py-3 rounded-2xl transition text-white w-full ${
    isDisabled ? 'pointer-events-none' : 'pointer-events-all'
  } ${isDisabled ? 'bg-gray-400' : 'bg-blue-600'} hover:bg-blue-700`

  if (href) {
    return (
      <Link href={href} as={as}>
        <a className={mainClasses}>{children}</a>
      </Link>
    )
  }

  return (
    <button className={mainClasses} type={type} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  )
}
