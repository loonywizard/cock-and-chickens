export default function LoadingScreen() {
  this.render = function () {
    const div = document.createElement('div');
    div.innerHTML = 'loading...';
    return div;
  };
}