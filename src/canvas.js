/**
 * Creates canvas and adds it to parent html tag
 *
 * @param {ScreenSizeController} args.screenSizeController
 * @param {Number} args.height
 * @param {Number} args.width
 * @param {DOMNode} args.parent
 * */
export default function createCanvas(args) {
  const { screenSizeController, height, width, parent } = args;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const offset = {};

  parent.appendChild(canvas);

  function changeCanvasSize() {
    const screenSize = screenSizeController.getScreenSize();

    canvas.width = width;
    canvas.height = height;

    if (screenSize.x / screenSize.y >= width / height) {
      canvas.style.height = '100%';
      canvas.style.width = 'auto';
      offset.x = (screenSize.x - width * screenSize.y / height) / 2;
    } else {
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      offset.x = 0;
    }

    offset.y = 0;
  }

  // We should change canvas size each time screen size has changed
  screenSizeController.subscribe(changeCanvasSize);
  changeCanvasSize();

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getOffset = () => ({ ...offset });

  const getRealSize = () => {
    const x = canvas.clientWidth;
    const y = canvas.clientHeight;
    return { x, y };
  };

  const getGameSize = () => {
    const x = canvas.width;
    const y = canvas.height;
    return { x, y };
  };

  return {
    ctx,
    clear,
    getOffset,
    getRealSize,
    getGameSize,
  };
}
