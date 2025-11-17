const { EVENTS, eventEmitter } = require('../utils/event-emitter');

class ScoreComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#score-block');
    this.#setInnerText(this.#gameState.score);

    eventEmitter.addHandler(EVENTS.SCORE_UPDATED, this.handleScoreUpdated);
  }

  handleScoreUpdated() {
    this.#setInnerText(this.#gameState.score);
  }

  #setInnerText(text) {
    this.#ui.innerText(text);
  }
}

module.exports = { ScoreComponent };
