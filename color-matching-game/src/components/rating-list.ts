import { Context } from '../state/context';
import { GameState } from '../state/game';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class RatingListComponent {
  readonly #ui: HTMLDivElement;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getElement('#rating-list');

    this.#render();

    this.#context.eventEmitter.addHandler(
      'RATING_UPDATED',
      this.handleRatingUpdated
    );
  }

  handleRatingUpdated = createEventHandler(() => {
    this.#render();
  }, this);

  #render() {
    const rating = this.#context.ratingState.rating;

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
