import { Category } from '../types/Categories'

export const parseCategoriesForDropdown = (categories: Category[] | undefined) =>
  categories ? categories.map((category) => ({ label: category.name, value: category.id.toString() })) : []
