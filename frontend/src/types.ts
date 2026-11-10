export type UserRole = 'customer' | 'staff' | 'admin'

export interface User {
  id: string | number
  name: string
  email: string
  phone: string
  role: UserRole
}