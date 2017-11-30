import { startGame, returnToMenu } from './actions';

export default function GameOverMenu(store) {
  function handlePlayButtonClick() {
    store.dispatch(startGame());
  }

  function handleReturnToMenuButtonClick() {
    store.dispatch(returnToMenu());
  }

  this.render = function render(score) {
    const div = document.createElement('div');
    div.classList.add('game-over-menu');

    const text = document.createElement('div');
    text.innerHTML = `Game over with score ${score}`;
    div.appendChild(text);

    const playButton = document.createElement('div');
    playButton.addEventListener('click', handlePlayButtonClick);
    playButton.innerHTML = 'Play';
    playButton.classList.add('button');
    div.appendChild(playButton);

    const returnToMenuButton = document.createElement('div');
    returnToMenuButton.addEventListener('click', handleReturnToMenuButtonClick);
    returnToMenuButton.innerHTML = 'Return to menu';
    returnToMenuButton.classList.add('button');
    div.appendChild(returnToMenuButton);

    return div;
  };
}
