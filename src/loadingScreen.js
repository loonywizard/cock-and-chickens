export default function LoadingScreen() {
  this.render = function render() {
    const div = document.createElement('div');
    div.innerHTML = 'loading...';
    return div;
  };
}
