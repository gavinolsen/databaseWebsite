//sets up the state of our app!

const initalState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
