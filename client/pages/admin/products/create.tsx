import { useIsAdmin } from 'utils/hooks/useIsAdmin'

const CreateProduct = () => {
  useIsAdmin()

  return <p>Create</p>
}

export default CreateProduct
