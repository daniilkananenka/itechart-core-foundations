import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter } from '../utils/event-emitter';

class ScoreComponent {
  readonly #ui: HTMLDivElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#score-block');

    this.#render();

    eventEmitter.addHandler('SCORE_UPDATED', this.handleScoreUpdated);
  }

  handleScoreUpdated = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = this.#gameState.score.toString();
  }
}

export { ScoreComponent };
