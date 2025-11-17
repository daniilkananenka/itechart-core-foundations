import { GameState } from '../state/game';
import { createComponentHandler, getElement } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class RatingListComponent {
  readonly #ui: HTMLDivElement;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getElement('#rating-list');

    this.#render();

    eventEmitter.addHandler(EVENTS.RATING_UPDATED, this.handleRatingUpdated);
  }

  handleRatingUpdated = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    const rating = this.#gameState.rating;

    if (rating.length) {
      this.#ui.innerHTML = rating.reduce((html, currentValue, index) => {
        return (
          html +
          `<div class="rating-list-item-block"><div>#${
            index + 1
          }</div><div>${currentValue} points</div></div>`
        );
      }, '');
    } else {
      this.#ui.innerHTML = 'No results yet';
    }
  }
}

export { RatingListComponent };
