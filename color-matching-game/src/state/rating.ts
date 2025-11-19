import { RATING_CONFIG } from '../constants/rating-config';
import { createEventHandler } from '../utils/event-emitter';
import { Context } from './context';

class RatingState {
  #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;

    this.#context.eventEmitter.addHandler('GAME_STOPED', this.handleGameStoped);
  }

  get rating() {
    return this.#getRating();
  }

  handleGameStoped = createEventHandler(() => {
    this.#updateRating(this.#context.scoreState.score);
  }, this);

  #getRating() {
    const rawRating = localStorage.getItem(RATING_CONFIG.STORAGE_KEY);

    if (!rawRating) return [];

    const rating = JSON.parse(rawRating);

    if (!this.#checkIsValidRating(rating)) return [];

    return this.#transformRating(rating);
  }

  #updateRating(result: number) {
    const rating = this.#getRating();

    rating.push(result);

    localStorage.setItem(
      RATING_CONFIG.STORAGE_KEY,
      JSON.stringify(this.#transformRating(rating))
    );

    this.#context.eventEmitter.emit('RATING_UPDATED', {
      rating: this.#getRating(),
    });
  }

  #checkIsValidRating(rating: number[]) {
    return (
      rating instanceof Array &&
      rating.reduce(
        (isArrayOfNumbers, currentValue) =>
          isArrayOfNumbers && typeof currentValue === 'number',
        true
      )
    );
  }

  #transformRating(rating: number[]) {
    return rating.toSorted((a, b) => b - a).slice(0, RATING_CONFIG.MAX_SIZE);
  }
}

export { RatingState };
