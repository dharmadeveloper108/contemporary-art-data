export class Token {
  constructor(token, expires_at) {
    this.token = token;
    this.expires_at = expires_at;
  }

  isExpired() {
    const now = new Date();
    const expirationDate = new Date(this.expires_at);
    if (expirationDate.setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      console.log("in-memory token expired");
      return true;
    }
    console.log("in-memory token not expired yet");
    return false;
  }
}
