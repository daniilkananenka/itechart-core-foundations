import { Context } from '../state/context';
import { GameState } from '../state/game';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class ControlButtonComponent {
  readonly #ui: HTMLButtonElement;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getElement('#control-button');

    this.#attachListeners();
    this.#render();

    this.#context.eventEmitter.addHandler(
      'GAME_STARTED',
      this.handleGameStarted
    );
    this.#context.eventEmitter.addHandler('GAME_STOPED', this.handleGameStoped);
  }

  handleGameStarted = createEventHandler(() => {
    this.#render();
  }, this);

  handleGameStoped = createEventHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = this.#context.gameState.isGameStarted
      ? 'Stop'
      : 'Start';
  }

  #attachListeners() {
    this.#ui.addEventListener('click', () => {
      if (!this.#context.gameState.isGameStarted) {
        this.#context.gameState.startGame();
        return;
      }

      this.#context.gameState.stopGame();
    });
  }
}

export { ControlButtonComponent };
