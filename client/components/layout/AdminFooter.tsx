export const AdminFooter: React.FC = ({ children }) => {
  return (
    <div
      className="absolute bottom-0 py-5 px-2 border-solid border-black border-t"
      style={{ left: '14.5%', width: '85.5%' }}
    >
      {children}
    </div>
  )
}
