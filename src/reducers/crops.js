function crops(state = [], action) {
  switch(action.type) {
    case 'CROPS_CHANGED' :
      return [action.start, action.end];
    default:
      return state;
  }
}

export default crops;
