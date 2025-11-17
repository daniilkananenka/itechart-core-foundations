class ScoreComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#score-block');
    this.#setInnerText(this.#gameState.score);

    eventEmitter.addHandler(EVENTS.SCORE_UPDATED, this.handleScoreUpdated);
  }

  handleScoreUpdated = createComponentHandler(() => {
    this.#setInnerText(this.#gameState.score);
  }, this);

  #setInnerText(text) {
    this.#ui.innerText = text;
  }
}
