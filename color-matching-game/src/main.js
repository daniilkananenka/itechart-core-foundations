const { ColorButtonsComponent } = require('./components/color-buttons');
const { ColorQuestionComponent } = require('./components/color-question');
const { ControlButtonComponent } = require('./components/control-button');
const { RatingListComponent } = require('./components/rating-list');
const { ScoreComponent } = require('./components/score');
const { TimerComponent } = require('./components/timer');
const { GameState } = require('./state/game');
const { RatingManager } = require('./utils/rating-manager');

const ratingManager = new RatingManager();
const gameState = new GameState({ ratingManager });

const colorButtonsComponent = new ColorButtonsComponent({ gameState });
const colorQuestionComponent = new ColorQuestionComponent({ gameState });
const controlButtonComponent = new ControlButtonComponent({ gameState });
const ratingListComponent = new RatingListComponent({ gameState });
const scoreComponent = new ScoreComponent({ gameState });
const timerComponent = new TimerComponent({ gameState });
