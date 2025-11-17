import { ColorButtonsComponent } from './components/color-buttons';
import { ColorQuestionComponent } from './components/color-question';
import { ControlButtonComponent } from './components/control-button';
import { RatingListComponent } from './components/rating-list';
import { ScoreComponent } from './components/score';
import { TimerComponent } from './components/timer';
import { GameState } from './state/game';
import { RatingManager } from './utils/rating-manager';

const ratingManager = new RatingManager();
const gameState = new GameState({ ratingManager });

const colorButtonsComponent = new ColorButtonsComponent({ gameState });
const colorQuestionComponent = new ColorQuestionComponent({ gameState });
const controlButtonComponent = new ControlButtonComponent({ gameState });
const ratingListComponent = new RatingListComponent({ gameState });
const scoreComponent = new ScoreComponent({ gameState });
const timerComponent = new TimerComponent({ gameState });
