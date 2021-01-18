export const OrdersListHeader = () => {
  const headers = ['Total price', 'Status', 'Full name', 'Email', 'Phone']

  return (
    <div className="flex justify-between items-center mb-3">
      {headers.map((header) => (
        <div key={header} className="w-1/4">
          {header}
        </div>
      ))}
    </div>
  )
}
