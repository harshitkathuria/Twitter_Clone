const initialState = {
  user: null,
  isAuthenticated: true,
  loading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
