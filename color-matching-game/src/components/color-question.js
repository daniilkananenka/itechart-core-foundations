class ColorQuestionComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#color-name-block');
    this.#setInnerText(this.#gameState.question);

    eventEmitter.addHandler(
      EVENTS.QUESTION_UPDATED,
      this.handleQuestionUpdated
    );
  }

  handleQuestionUpdated = createComponentHandler(() => {
    this.#setInnerText(this.#gameState.question);
  });

  #setInnerText(text) {
    this.#ui.innerText = text;
  }
}
