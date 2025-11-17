const { EVENTS, eventEmitter } = require('../utils/event-emitter');

class TimerComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#timer-block');
    this.#setInnerText(this.#gameState.remainingTime);

    eventEmitter.addHandler(EVENTS.TIMER_UPDATED, this.handleTimerUpdated);
  }

  handleTimerUpdated() {
    this.#setInnerText(this.#gameState.remainingTime);
  }

  #setInnerText(text) {
    this.#ui.innerText(text);
  }
}

module.exports = { TimerComponent };
