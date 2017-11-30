import {
  START_GAME,
  STOP_GAME,
  RETURN_TO_MENU,
  ALL_TEXTURES_WERE_LOADED,
} from './actions';

const initialState = {
  isGame: false,
  isGameOver: false,
  wereAllTexturesLoaded: false,
  score: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isGame: true,
        isGameOver: false,
      };
    case STOP_GAME:
      return {
        ...state,
        isGameOver: true,
        score: action.payload.score,
      };
    case RETURN_TO_MENU:
      return {
        ...state,
        isGame: false,
        isGameOver: false,
      };
    case ALL_TEXTURES_WERE_LOADED:
      return {
        ...state,
        wereAllTexturesLoaded: true,
      };
    default:
      return state;
  }
}
