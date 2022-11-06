export interface IUser {
  id: number
  name: string
  email: string
  password: string
}

export interface IUserData extends Omit<IUser, 'password'> {}
