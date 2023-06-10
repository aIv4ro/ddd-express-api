import { type Nullable } from '../../shared/domain/nullable'
import { type User } from './user'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserRepository {
  save: (user: User) => Promise<void>
  findByUsername: (username: string) => Promise<Nullable<User>>
}
