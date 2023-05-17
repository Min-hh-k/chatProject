const initialUserState = {
  currentChannel: null,
  isLoading: true,
};

// eslint-disable-next-line
export default function (state = initialUserState, action) {
  switch (action.type) {
    case "setCurrentChannel":
      return {
        ...state,
        currentChannel: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}