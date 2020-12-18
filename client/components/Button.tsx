type Props = {
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<Props> = ({ onClick, type = 'button', children }) => {
  return (
    <button
      className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 transition text-white w-full"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
