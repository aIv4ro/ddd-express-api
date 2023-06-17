import { decode, sign } from 'jsonwebtoken'
import { type TokenService } from '../domain/token-service'
import { type Config } from '../domain/config'

export class JWTokenService implements TokenService {
  constructor (
    private readonly config: Config
  ) {}

  encode (data: any): string {
    return sign(data, this.config.jwtPrivateKey)
  }

  decode (token: string): any {
    const tokenDecoded = decode(token)
    if (typeof tokenDecoded !== 'object') throw new Error('invalid token parse')
    return { ...tokenDecoded, iat: undefined }
  }
}
