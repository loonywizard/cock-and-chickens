/**
 * Creates WeaponsManager
 *
 * WeaponsManager serves ammunition count and has methods for managing ammunition count
 *
 * @param {Number} args.ammunitionCount
 * */
export default function createWeaponsManager(args) {
  let { ammunitionCount } = args;

  const addAmmunition = (countOfWeapons) => {
    ammunitionCount += countOfWeapons;
  };

  const useAmmunition = (countOfWeapons = 1) => {
    ammunitionCount -= countOfWeapons;
  };

  const hasAmmunition = () => ammunitionCount > 0;

  const getAmmunitionCount = () => ammunitionCount;

  return {
    addAmmunition,
    useAmmunition,
    hasAmmunition,
    getAmmunitionCount,
  };
}
