/**
 * Creates ScoreManager
 *
 * ScoreManager serves and manages the score in game
 * */
export default function createScoreManager() {
  let score = 0;

  const increaseScore = (count = 1) => {
    score += count;
  };

  const getScore = () => score;

  return {
    increaseScore,
    getScore,
  };
}