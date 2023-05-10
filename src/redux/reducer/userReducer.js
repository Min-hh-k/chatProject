// 리덕스 기본 값
// isLoading === true 일 땐 랜더링x, 로딩페이지o
const initialUserState = {
  currentUser: null,
  isLoading: true,
};

// eslint-disable-next-line
export default function (state = initialUserState, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case "logoutUser":
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
      // 스토어에 currentUser 정보는 나두고 photoURL 만 payload 값 변경
      case "updatePhotoURL":
        return {
          ...state,
          currentUser: {...state.currentUser, photoURL : action.payload},
          isLoading: false,
        };

    default:
      return state;
  }
}
