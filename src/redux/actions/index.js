export const userData = (user) => ({
  type: 'USER_DATA',
  user,
});

export const playerScore = (score) => ({
  type: 'PLAYER_SCORE',
  score,
});

export const requestBegin = () => ({
  type: 'REQUEST_BEGIN',
});

export const requestSuccess = (data) => ({
  type: 'REQUEST_SUCCESS',
  data,
});

export const requestError = (error) => ({
  type: 'REQUEST_ERROR',
  error,
});

export const questionIndex = () => ({
  type: 'QUESTION_INDEX',
});

export const showAnswer = () => ({
  type: 'SHOW_ANSWER',
});

export const hideAnswer = () => ({
  type: 'HIDE_ANSWER',
});

export const saveScore = (score) => ({
  type: 'SAVE_SCORE',
  score,
});

export const triviaThunk = () => async (dispatch) => {
  dispatch(requestBegin());
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(requestSuccess(data.results));
  } catch (error) {
    dispatch(requestError(error));
  }
};
