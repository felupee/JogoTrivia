const INITIAL_STATE = {
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
  default:
    return state;
  }
};
export default player;
