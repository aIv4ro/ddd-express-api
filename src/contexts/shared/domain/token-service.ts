export interface TokenService {
  encode: (data: any) => string
  decode: (token: string) => any
}
