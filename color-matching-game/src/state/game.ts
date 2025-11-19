import { createEventHandler } from '../utils/event-emitter';
import { Context } from './context';

class GameState {
  #context: Context;
  #isGameStarted: boolean;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#isGameStarted = false;

    this.#context.eventEmitter.addHandler('TIMER_ENDED', this.handleTimerEnded);
  }

  get isGameStarted() {
    return this.#isGameStarted;
  }

  handleTimerEnded = createEventHandler(() => {
    this.stopGame();
  }, this);

  startGame() {
    this.#isGameStarted = true;

    this.#context.eventEmitter.emit('GAME_STARTED', undefined);
  }

  stopGame() {
    this.#isGameStarted = false;

    this.#context.eventEmitter.emit('GAME_STOPED', undefined);
  }
}

export { GameState };
