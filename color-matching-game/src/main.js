const ratingManager = new RatingManager();
const gameState = new GameState({ ratingManager });

const colorButtonsComponent = new ColorButtonsComponent({ gameState });
const colorQuestionComponent = new ColorQuestionComponent({ gameState });
const controlButtonComponent = new ControlButtonComponent({ gameState });
const ratingListComponent = new RatingListComponent({ gameState });
const scoreComponent = new ScoreComponent({ gameState });
const timerComponent = new TimerComponent({ gameState });
