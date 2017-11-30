import config from 'config';
import { allTexturesWereLoaded } from './actions';

/*
* we need textures for
* 1. player - 1 texture
* 2. chickens (2 types) - 2 textures
* 3. coins - 1 texture
* 4. ammunition - 1 texture
* 5. aim - 1 texture
*
* SUM = 1 + 1 + 2 + 1 + 1 = 6
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

  this.loadTextures = function loadTextures() {
    const textures = {
      player: new Image(),
      chicken: new Image(),
      grayChicken: new Image(),
      coin: new Image(),
      ammunition: new Image(),
      aim: new Image(),
    };

    Object.keys(textures).forEach((key) => {
      textures[key].src = config[key].textureUrl;
      textures[key].onload = incrementCountOfLoaedTextures;
    });

    return textures;
  };
}
