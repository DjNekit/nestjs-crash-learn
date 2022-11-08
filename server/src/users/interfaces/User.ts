export interface IUser {
  id: number
  name: string
  email: string
  refreshToken?: string | null
  password: string
}

export interface IUserData extends Omit<IUser, 'password'> {}
