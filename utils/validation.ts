import type { Customer, Product, FormErrors } from "../types"

export function validateCustomer(customer: Partial<Customer>): FormErrors {
  const errors: FormErrors = {}

  if (!customer.name?.trim()) {
    errors.name = "Name is required"
  }

  if (!customer.email?.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    errors.email = "Invalid email format"
  }

  if (!customer.phone?.trim()) {
    errors.phone = "Phone is required"
  } else if (!/^\+?[\d\s\-$$$$]+$/.test(customer.phone)) {
    errors.phone = "Invalid phone format"
  }

  if (!customer.address?.trim()) {
    errors.address = "Address is required"
  }

  if (!customer.location?.trim()) {
    errors.location = "Location is required"
  }

  return errors
}

export function validateProduct(product: Partial<Product>): FormErrors {
  const errors: FormErrors = {}

  if (!product.name?.trim()) {
    errors.name = "Product name is required"
  }

  if (!product.description?.trim()) {
    errors.description = "Description is required"
  }

  if (!product.price || product.price <= 0) {
    errors.price = "Price must be greater than 0"
  }

  if (!product.inventory || product.inventory < 0) {
    errors.inventory = "Inventory must be 0 or greater"
  }

  if (!product.category?.trim()) {
    errors.category = "Category is required"
  }

  return errors
}
