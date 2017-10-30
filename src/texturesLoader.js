import { allTexturesWereLoaded } from './actions';
import config from './config';

/*
* we need textures for
* 1. player - 1 texture
* 2. chickens (3 types) - 3 textures
* 3. coins - 1 texture
* 4. ammunition - 1 texture
*
* SUM = 1 + 1 + 3 + 1 = 6
* */

const COUNT_OF_TEXTURES = 6;

export default function TexturesLoader(store) {
  let countOfLoadedTextures = 0;

  function incrementCountOfLoaedTextures() {
    countOfLoadedTextures += 1;
    if (countOfLoadedTextures === COUNT_OF_TEXTURES) {
      store.dispatch(allTexturesWereLoaded());
    }
  }

  this.loadTextures = function () {
    const textures = {
      player: new Image(),
      chicken: new Image(),
      grayChicken: new Image(),
      bigChicken: new Image(),
      coin: new Image(),
      ammunition: new Image(),
    };
    for (let key in textures) {
      textures[key].src = config[key].textureUrl;
      textures[key].onload = incrementCountOfLoaedTextures;
    }
    return textures;
  }
}