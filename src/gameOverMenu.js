import { startGame, returnToMenu } from './actions';

export default function GameOverMenu(store) {
  function handlePlayButtonClick() {
    store.dispatch(startGame());
  }

  function handleReturnToMenuButtonClick() {
    store.dispatch(returnToMenu());
  }

  this.render = function (score) {
    const div = document.createElement('div');

    const text = document.createElement('div');
    text.innerHTML = `Game over with score ${score}`;
    div.appendChild(text);

    const playButton = document.createElement('div');
    playButton.addEventListener('click', handlePlayButtonClick);
    playButton.innerHTML = 'Play';
    div.appendChild(playButton);

    const returnToMenuButton = document.createElement('div');
    returnToMenuButton.addEventListener('click', handleReturnToMenuButtonClick);
    returnToMenuButton.innerHTML = 'Return to menu';
    div.appendChild(returnToMenuButton);

    return div;
  };
}