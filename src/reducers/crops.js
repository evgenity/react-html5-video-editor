function crops(state = [], action) {
  switch(action.type) {
    case 'CROPS_CHANGED' :
      return [action.start ? action.start : state[0], action.end ? action.end : state[1]];
    case 'IMG_INSERT' :
    console.log(state, action)
    	state.push(action.position);
      return state	
    default:
      return state;
  }
}

export default crops;
