import { ColorButtonsComponent } from './components/color-buttons';
import { ColorQuestionComponent } from './components/color-question';
import { ControlButtonComponent } from './components/control-button';
import { RatingListComponent } from './components/rating-list';
import { ScoreComponent } from './components/score';
import { TimerComponent } from './components/timer';
import { Context } from './state/context';

const context = new Context();

const colorButtonsComponent = new ColorButtonsComponent({ context });
const colorQuestionComponent = new ColorQuestionComponent({ context });
const controlButtonComponent = new ControlButtonComponent({ context });
const ratingListComponent = new RatingListComponent({ context });
const scoreComponent = new ScoreComponent({ context });
const timerComponent = new TimerComponent({ context });
