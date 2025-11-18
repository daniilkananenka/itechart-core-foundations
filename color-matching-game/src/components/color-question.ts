import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter } from '../utils/event-emitter';

class ColorQuestionComponent {
  readonly #ui: HTMLDivElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#color-name-block');

    this.#render();

    eventEmitter.addHandler('QUESTION_UPDATED', this.handleQuestionUpdated);
    eventEmitter.addHandler('ANSWER_IS_CORRECT', this.handleAnswerIsCorrect);
    eventEmitter.addHandler(
      'ANSWER_IS_INCORRECT',
      this.handleAnswerIsIncorrect
    );
  }

  handleQuestionUpdated = createComponentHandler(() => {
    this.#render();
  }, this);

  handleAnswerIsCorrect = createComponentHandler(() => {
    requestAnimationFrame(() => this.#ui.classList.add('correct'));
    setTimeout(() => {
      requestAnimationFrame(() => this.#ui.classList.remove('correct'));
    }, 0.5 * 1000);
  }, this);

  handleAnswerIsIncorrect = createComponentHandler(() => {
    requestAnimationFrame(() => this.#ui.classList.add('incorrect'));
    setTimeout(() => {
      requestAnimationFrame(() => this.#ui.classList.remove('incorrect'));
    }, 0.5 * 1000);
  }, this);

  #render() {
    this.#ui.innerText = this.#gameState.question.toString();
  }
}

export { ColorQuestionComponent };
