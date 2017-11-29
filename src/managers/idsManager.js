/*
* Creates IdsManager
*
* IdsManager creates unique ids for entities
* */
export default function createIdsManager() {
  let id = 0;

  const getUniqueId = () => id++;

  return {
    getUniqueId,
  }
}