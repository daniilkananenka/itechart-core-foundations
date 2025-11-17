class ControlButtonComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#control-button');

    this.#ui.addEventListener('click', () => {
      if (!this.#gameState.isGameStarted) {
        this.#gameState.startGame();
        return;
      }

      this.#gameState.stopGame();
    });

    eventEmitter.addHandler(EVENTS.GAME_STARTED, this.handleGameStarted);
    eventEmitter.addHandler(EVENTS.GAME_STOPED, this.handleGameStoped);
  }

  handleGameStarted = createComponentHandler(() => {
    this.#setInnerText('Stop');
  }, this);

  handleGameStoped = createComponentHandler(() => {
    this.#setInnerText('Start');
  }, this);

  #setInnerText(text) {
    this.#ui.innerText = text;
  }
}
