export const reducer = (
    state = { local: false, details: { id: '', name: '' } },
    action
  ) => {
    switch (action.type) {
      case 'LOCAL':
        return { ...state, local: action.payload };
      case 'ID':
        return { ...state, details: action.payload };
      default:
        return state;
    }
  };
  