const outpassReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "PASS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default outpassReducer;
