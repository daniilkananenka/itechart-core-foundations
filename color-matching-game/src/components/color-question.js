const { EVENTS, eventEmitter } = require('../utils/event-emitter');

class ColorQuestionComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.getElementById('color-name-block');
    this.#setInnerText(this.#gameState.question);

    eventEmitter.addHandler(
      EVENTS.QUESTION_UPDATED,
      this.handleQuestionUpdated
    );
  }

  handleQuestionUpdated() {
    this.#setInnerText(this.#gameState.question);
  }

  #setInnerText(text) {
    this.#ui.innerText(text);
  }
}

module.exports = { ColorQuestionComponent };
