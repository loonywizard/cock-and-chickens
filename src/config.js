const canvas = {
  width: 900,
  height: 800,
};

const player = {
  textureUrl: 'images/red.png',
  position: { x: 150, y: canvas.height - 80 },
  walkingArea: {
    x: { from: 0, to: canvas.width },
    y: { from: canvas.height - 200, to: canvas.height },
  },
  size: { x: 50, y: 50 },
  maxSpeed: 0.65,
  radius: 25,
};

const config = {
  canvas,
  player,
  chicken: {
    textureUrl: 'images/white_chicken_texture.png',
    size: { x: 50, y: 61 },
    spritesCount: 3,
    spriteChangeTime: 250,
    speed: 0.05,
    maxSpeed: 0.25,
    health: 1,
  },
  grayChicken: {
    textureUrl: 'images/gray_chicken_texture.png',
    size: { x: 50, y: 61 },
    spritesCount: 3,
    spriteChangeTime: 200,
    speed: 0.15,
    maxSpeed: 0.45,
    health: 1,
  },
  bigChicken: {
    textureUrl: 'images/red.png',
    size: { x: 100, y: 100 },
    radius: 50,
    speed: 0.02,
    maxSpeed: 0.05,
    health: 5,
  },
  ammunition: {
    size: { x: 60, y: 57 },
    speed: 0.45,
    textureUrl: 'images/shotgun.png',
  },
  coin: {
    textureUrl: 'images/coin.png',
    size: { x: 55, y: 45 },
    spritesCount: 6,
    spriteChangeTime: 100,
    speed: 0.45,
  },
};

export default config;