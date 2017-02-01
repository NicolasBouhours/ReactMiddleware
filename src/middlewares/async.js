export default function({ dispatch }) {
  return next => action => {
    // If action does not have a payload
    // or, the payload does not have a .then property
    // we don't care about it, send it on
    if(!action.payload || !action.payload.then) {
      return next(action)
    }

    // Make sur the action's promise resolve
    action.payload.then(response => {
      // Create a new action with the old type, but
      // replace the promise with the response data
      const newAction = { ...action, payload: response }
      dispatch(newAction)
    })
  }
}
