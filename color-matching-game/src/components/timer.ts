import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter } from '../utils/event-emitter';

class TimerComponent {
  readonly #ui: HTMLDivElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#timer-block');

    this.#render();

    eventEmitter.addHandler('TIMER_UPDATED', this.handleTimerUpdated);
  }

  handleTimerUpdated = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = this.#gameState.remainingTime.toString();
  }
}

export { TimerComponent };
