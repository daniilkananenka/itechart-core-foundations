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

    this.#ui.replaceChildren();

    if (rating.length) {
      const fragment = document.createDocumentFragment();

      rating.forEach((currentValue, index) => {
        const listItemBlock = document.createElement('div');
        listItemBlock.className = 'rating-list-item-block';

        const indexElement = document.createElement('div');
        indexElement.textContent = `#${index + 1}`;

        const pointsElement = document.createElement('div');
        pointsElement.textContent = `${currentValue} points`;

        listItemBlock.append(indexElement, pointsElement);
        fragment.appendChild(listItemBlock);
      });

      this.#ui.appendChild(fragment);
    } else {
      this.#ui.textContent = 'No results yet';
    }
  }
}

export { RatingListComponent };
