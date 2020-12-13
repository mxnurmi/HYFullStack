const notificationReducer = (state = 'WELCOME!', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      default:
        return state
    }
  }

export default notificationReducer