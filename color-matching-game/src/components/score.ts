import { Context } from '../state/context';
import { GameState } from '../state/game';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class ScoreComponent {
  readonly #ui: HTMLDivElement;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getElement('#score-block');

    this.#render();

    this.#context.eventEmitter.addHandler(
      'SCORE_UPDATED',
      this.handleScoreUpdated
    );
  }

  handleScoreUpdated = createEventHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.textContent = this.#context.scoreState.score.toString();
  }
}

export { ScoreComponent };
