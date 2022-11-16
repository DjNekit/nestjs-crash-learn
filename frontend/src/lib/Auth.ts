export class Auth {
  private accessToken: string = ''
  getToken() {
    return this.accessToken
  }

  updateToken(newToken: string) {
    this.accessToken = `Bearer ${newToken}`
    return this.accessToken
  }

  deleteToken() {
    this.accessToken = ''
  }
}

export const auth = new Auth()