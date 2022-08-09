const INITIAL_STATE = {
  data: [],
  index: 0,
  error: '',
  token: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_DATA':
    return {
      ...state,
      name: action.user.nome,
      gravatarEmail: action.user.email,
    };
  case 'PLAYER_SCORE':
    return {
      ...state,
      score: action.score,
    };
  case 'REQUEST_SUCCESS':
    return {
      ...state,
      data: action.data,
    };
  case 'REQUEST_ERROR':
    return {
      ...state,
      error: action.error,
    };
  case 'QUESTION_INDEX':
    return {
      ...state,
      index: state.index + 1,
    };
  default:
    return state;
  }
};
export default player;
