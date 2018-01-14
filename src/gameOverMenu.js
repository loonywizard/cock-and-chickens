import { startGame, returnToMenu } from './actions';

export default function GameOverMenu(store) {
  function handlePlayButtonClick() {
    store.dispatch(startGame());
  }

  this.render = function render(score) {
    const div = document.createElement('div');
    div.classList.add('game-over-menu');

    const text = document.createElement('div');
    text.innerHTML = `Game over with score ${score}`;
    text.classList.add('game-over-score');
    div.appendChild(text);

    const playButton = document.createElement('div');
    playButton.addEventListener('click', handlePlayButtonClick);
    playButton.innerHTML = 'Play again';
    playButton.classList.add('button');
    div.appendChild(playButton);

    return div;
  };
}
