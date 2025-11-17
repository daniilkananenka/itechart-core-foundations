import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class ColorQuestionComponent {
  readonly #ui: HTMLDivElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#color-name-block');

    this.#render();

    eventEmitter.addHandler(
      EVENTS.QUESTION_UPDATED,
      this.handleQuestionUpdated
    );
  }

  handleQuestionUpdated = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = this.#gameState.question.toString();
  }
}

export { ColorQuestionComponent };
