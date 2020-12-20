export const ProductListHeader = () => {
  const headers = ['Image', 'Name', 'Category', 'Price', 'Stock']

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
