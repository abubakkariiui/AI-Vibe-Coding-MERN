export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  location: string
  status: "Active" | "Inactive"
  joinDate: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  inventory: number
  category: string
  status: "Active" | "Inactive"
  createdDate: string
}

export interface FormErrors {
  [key: string]: string
}
