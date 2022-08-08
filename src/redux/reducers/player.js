const INITIAL_STATE = {
  data: [],
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
  default:
    return state;
  }
};
export default player;
