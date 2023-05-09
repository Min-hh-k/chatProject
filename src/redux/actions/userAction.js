export default function setUser(user) {
  return {
    type: "setUser",
    payload: user
  }
}

export function logoutUser() {
  return {
    type: "logoutUser",
  }
}
