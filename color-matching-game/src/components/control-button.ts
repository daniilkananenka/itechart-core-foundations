import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class ControlButtonComponent {
  readonly #ui: HTMLButtonElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#control-button');

    this.#attachListener();
    this.#render();

    eventEmitter.addHandler(EVENTS.GAME_STARTED, this.handleGameStarted);
    eventEmitter.addHandler(EVENTS.GAME_STOPED, this.handleGameStoped);
  }

  handleGameStarted = createComponentHandler(() => {
    this.#render();
  }, this);

  handleGameStoped = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = this.#gameState.isGameStarted ? 'Stop' : 'Start';
  }

  #attachListener() {
    this.#ui.addEventListener('click', () => {
      if (!this.#gameState.isGameStarted) {
        this.#gameState.startGame();
        return;
      }

      this.#gameState.stopGame();
    });
  }
}

export { ControlButtonComponent };
