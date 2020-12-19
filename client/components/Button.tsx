type Props = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
}

export const Button: React.FC<Props> = ({ onClick, type = 'button', children, isDisabled = false }) => {
  return (
    <button
      className={`${isDisabled ? 'bg-gray-400' : 'bg-blue-600'} px-5 py-3 rounded-2xl ${
        !isDisabled && 'hover:bg-blue-700'
      } transition text-white w-full ${isDisabled ? 'pointer-events-none' : 'pointer-events-all'}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
