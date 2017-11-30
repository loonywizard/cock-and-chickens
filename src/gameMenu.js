import { startGame } from './actions';

export default function GameMenu(store) {
  function handlePlayButtonClick() {
    store.dispatch(startGame());
  }

  this.render = function () {
    const div = document.createElement('div');
    const playButton = document.createElement('div');

    div.classList.add('game-menu');
    playButton.classList.add('button');
    playButton.addEventListener('click', handlePlayButtonClick);
    playButton.innerHTML = 'Play';
    div.appendChild(playButton);

    return div;
  };
}