import * as jwt from 'jsonwebtoken'
import { type TokenService } from '../domain/token-service'
import { type Config } from '../domain/config'

export class JWTokenService implements TokenService {
  private readonly jwt = jwt

  constructor (
    private readonly config: Config
  ) {}

  encode (data: any): string {
    return this.jwt.sign(data, this.config.jwtPrivateKey)
  }

  decode (token: string): any {
    const tokenDecoded = this.jwt.decode(token)
    if (typeof tokenDecoded !== 'string') throw new Error('invalid token parse')
    return JSON.parse(tokenDecoded)
  }
}
