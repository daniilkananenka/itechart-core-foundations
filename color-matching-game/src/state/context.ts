import { EventEmitter, EventEmitterPayloads } from '../utils/event-emitter';
import { GameState } from './game';
import { RatingState } from './rating';
import { RoundState } from './round';
import { ScoreState } from './score';
import { TimerState } from './timer';

class Context {
  #eventEmitter: EventEmitter<EventEmitterPayloads>;

  #gameState: GameState;
  #ratingState: RatingState;
  #roundState: RoundState;
  #scoreState: ScoreState;
  #timerState: TimerState;

  constructor() {
    this.#eventEmitter = new EventEmitter<EventEmitterPayloads>();

    this.#gameState = new GameState({ context: this });
    this.#ratingState = new RatingState({ context: this });
    this.#roundState = new RoundState({ context: this });
    this.#scoreState = new ScoreState({ context: this });
    this.#timerState = new TimerState({ context: this });
  }

  get eventEmitter() {
    return this.#eventEmitter;
  }

  get gameState() {
    return this.#gameState;
  }

  get ratingState() {
    return this.#ratingState;
  }

  get roundState() {
    return this.#roundState;
  }

  get scoreState() {
    return this.#scoreState;
  }

  get timerState() {
    return this.#timerState;
  }
}

export { Context };
