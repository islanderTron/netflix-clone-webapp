const initalVideoState = { 
  playing: false
}

function reducer( state = initalVideoState, action) {
  
  switch(action.type) {
    case 'PLAYING':
      return {
        ...state,
        playing: true
      }

    case 'NOTPLAYING': 
      return {
        ...state,
        playing: false
      }

    default: 
      return state
  }
}

export default reducer; 