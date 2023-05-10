export default function setUser(user) {
  return {
    type: "setUser",
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: "logoutUser",
  };
}

// 프로필 사진 업데이트 액션
export function updatePhotoURL(photoUrl) {
  return {
    type: "updatePhotoURL",
    payload: photoUrl,
  };
}
