export default function createWeaponsManager(args) {
  const weapon = {
    ammunitionCount: args.ammunitionCount,
  };

  const addAmmunition = (ammunitionCount) => {
    weapon.ammunitionCount += ammunitionCount;
  };

  const useAmmunition = (ammunitionCount = 1) => {
    weapon.ammunitionCount -= ammunitionCount;
  };

  const hasAmmunition = () => weapon.ammunitionCount > 0;

  const getAmmunitionCount = () => weapon.ammunitionCount;

  return {
    addAmmunition,
    useAmmunition,
    hasAmmunition,
    getAmmunitionCount,
  };
}