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
    default:
      return state;
  }
}
