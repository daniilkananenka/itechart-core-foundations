import { createComponentHandler } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class TimerComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#timer-block');
    this.#setInnerText(this.#gameState.remainingTime);

    eventEmitter.addHandler(EVENTS.TIMER_UPDATED, this.handleTimerUpdated);
  }

  handleTimerUpdated = createComponentHandler(() => {
    this.#setInnerText(this.#gameState.remainingTime);
  }, this);

  #setInnerText(text) {
    this.#ui.innerText = text;
  }
}

export { TimerComponent };
