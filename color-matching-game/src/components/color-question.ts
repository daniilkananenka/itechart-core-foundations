import { Context } from '../state/context';
import { GameState } from '../state/game';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class ColorQuestionComponent {
  readonly #ui: HTMLDivElement;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getElement('#color-name-block');

    this.#render();

    this.#context.eventEmitter.addHandler(
      'QUESTION_UPDATED',
      this.handleQuestionUpdated
    );
    this.#context.eventEmitter.addHandler(
      'ANSWER_IS_CORRECT',
      this.handleAnswerIsCorrect
    );
    this.#context.eventEmitter.addHandler(
      'ANSWER_IS_INCORRECT',
      this.handleAnswerIsIncorrect
    );
  }

  handleQuestionUpdated = createEventHandler(() => {
    this.#render();
  }, this);

  handleAnswerIsCorrect = createEventHandler(() => {
    requestAnimationFrame(() => this.#ui.classList.add('correct'));
    setTimeout(() => {
      requestAnimationFrame(() => this.#ui.classList.remove('correct'));
    }, 0.5 * 1000);
  }, this);

  handleAnswerIsIncorrect = createEventHandler(() => {
    requestAnimationFrame(() => this.#ui.classList.add('incorrect'));
    setTimeout(() => {
      requestAnimationFrame(() => this.#ui.classList.remove('incorrect'));
    }, 0.5 * 1000);
  }, this);

  #render() {
    this.#ui.textContent = this.#context.roundState.question.toString();
  }
}

export { ColorQuestionComponent };
