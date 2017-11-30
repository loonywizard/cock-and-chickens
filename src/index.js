import { createStore } from 'redux';
import GameMenu from './gameMenu';
import GameOverMenu from './gameOverMenu';
import Scene from './scene';
import LoadingScreen from './loadingScreen';
import TexturesLoader from './texturesLoader';
import reducer from './reducer';

const store = createStore(reducer);

const root = document.getElementById('app');

const gameMenu = new GameMenu(store);
const gameOverMenu = new GameOverMenu(store);
const scene = new Scene(store);
const loadingScreen = new LoadingScreen();
const texturesLoader = new TexturesLoader(store);

const textures = texturesLoader.loadTextures();

function renderApplication() {
  const state = store.getState();

  root.innerHTML = '';

  if (state.isGameOver) {
    const { score } = store.getState();
    root.appendChild(gameOverMenu.render(score));
  } else if (state.isGame && !state.wereAllTexturesLoaded) {
    root.appendChild(loadingScreen.render());
  } else if (state.isGame) {
    scene.init(textures);
    root.appendChild(scene.render());
    scene.startGame();
  } else {
    root.appendChild(gameMenu.render());
  }
}

renderApplication();

store.subscribe(renderApplication);