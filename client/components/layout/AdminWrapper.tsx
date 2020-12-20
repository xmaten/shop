import { AdminSidebar } from '../nav/AdminSidebar'

export const AdminWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      {children}
    </div>
  )
}
