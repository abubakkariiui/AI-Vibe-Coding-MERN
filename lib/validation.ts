// Backend validation schemas

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export function validateCustomer(data: any): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required" })
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" })
  }

  if (!data.phone || typeof data.phone !== "string") {
    errors.push({ field: "phone", message: "Phone is required" })
  } else if (!/^\+?[\d\s\-()]+$/.test(data.phone)) {
    errors.push({ field: "phone", message: "Invalid phone format" })
  }

  if (!data.address || typeof data.address !== "string" || data.address.trim().length === 0) {
    errors.push({ field: "address", message: "Address is required" })
  }

  if (!data.location || typeof data.location !== "string" || data.location.trim().length === 0) {
    errors.push({ field: "location", message: "Location is required" })
  }

  if (data.status && !["Active", "Inactive"].includes(data.status)) {
    errors.push({ field: "status", message: "Status must be Active or Inactive" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateProduct(data: any): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "Product name is required" })
  }

  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push({ field: "description", message: "Description is required" })
  }

  if (data.price === undefined || data.price === null || typeof data.price !== "number" || data.price <= 0) {
    errors.push({ field: "price", message: "Price must be a positive number" })
  }

  if (
    data.inventory === undefined ||
    data.inventory === null ||
    typeof data.inventory !== "number" ||
    data.inventory < 0
  ) {
    errors.push({ field: "inventory", message: "Inventory must be a non-negative number" })
  }

  if (!data.category || typeof data.category !== "string" || data.category.trim().length === 0) {
    errors.push({ field: "category", message: "Category is required" })
  }

  if (data.status && !["Active", "Inactive"].includes(data.status)) {
    errors.push({ field: "status", message: "Status must be Active or Inactive" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
