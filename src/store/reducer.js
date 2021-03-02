const initialState = {
  downKeys: [],
  events: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "NOTE_ON":
      state = { ...state };
      state.downKeys.push(action.key);
      state.events.push(action);
      return state;

    case "NOTE_OFF":
      state = { ...state };
      state.downKeys = state.downKeys.filter(key => key !== action.key);
      state.events.push(action);
      return state;

    case "CLEAR_EVENT_QUEUE":
      state = { ...state };
      state.events = [];
      return state;
    default:
      return state;
  }
}

export { reducer, initialState };
