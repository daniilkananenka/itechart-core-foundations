import { GAME_CONFIG } from '../constants/game-config';
import { createEventHandler } from '../utils/event-emitter';
import { Context } from './context';

class TimerState {
  #context: Context;
  #seconds: number;
  #intervalId: number | undefined;

  constructor({ context }: { context: Context }) {
    this.#context = context;

    this.#seconds = 0;
    this.#intervalId = undefined;

    this.#context.eventEmitter.addHandler(
      'GAME_STARTED',
      this.handleGameStarted
    );
    this.#context.eventEmitter.addHandler('GAME_STOPED', this.handleGameStoped);
  }

  get seconds() {
    return this.#seconds;
  }

  handleGameStarted = createEventHandler(() => {
    this.#startTimer();
  }, this);

  handleGameStoped = createEventHandler(() => {
    this.#clearTimer();
  }, this);

  #startTimer() {
    this.#seconds = GAME_CONFIG.GAME_DURATION_SECONDS;
    this.#context.eventEmitter.emit('TIMER_UPDATED', {
      seconds: this.#seconds,
    });

    this.#intervalId = setInterval(() => {
      --this.#seconds;
      this.#context.eventEmitter.emit('TIMER_UPDATED', {
        seconds: this.#seconds,
      });

      if (this.#seconds === 0) {
        this.#context.eventEmitter.emit('TIMER_ENDED', undefined);
      }
    }, GAME_CONFIG.TIMER_UPDATE_INTERVAL);
  }

  #clearTimer() {
    clearInterval(this.#intervalId);
  }
}

export { TimerState };
