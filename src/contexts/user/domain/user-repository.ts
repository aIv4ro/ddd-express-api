import { type User } from './user'

export interface UserRepository {
  save: (user: Omit<User, 'id'>) => Promise<void>
  searchAll: () => Promise<User[]>
}
