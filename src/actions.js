/**
 * Starts the game, user clicks 'play' in menu or 'restart' in game over menu
 * Then game scene should initialize again
 */
export const START_GAME = 'START_GAME';

/**
 * It stops the game, and we should render a game over menu,
 * where we should display the score in game
 * we should put two buttons to that menu
 * 'restart' and 'return to menu'
 * It also sets score of a game so game over menu can display it
 */
export const STOP_GAME = 'STOP_GAME';

/**
 * It just returns user to main menu
 */
export const RETURN_TO_MENU = 'RETURN_TO_MENU';

/**
 * Triggers 'wereAllTexturesLoaded' field in state
 * When page is loaded, we starting loading textures for the game
 * (because we only have one level), and if player clicked 'play'
 * before textures were loaded, we should display a loader,
 */
export const ALL_TEXTURES_WERE_LOADED = 'ALL_TEXTURES_WERE_LOADED';

export const startGame = () => ({ type: START_GAME });
export const stopGame = (score) => ({ type: STOP_GAME, payload: { score }});
export const returnToMenu = () => ({ type: RETURN_TO_MENU });
export const allTexturesWereLoaded = () => ({ type: ALL_TEXTURES_WERE_LOADED });
