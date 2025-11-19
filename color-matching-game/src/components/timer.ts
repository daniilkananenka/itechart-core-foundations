import { Context } from '../state/context';
import { GameState } from '../state/game';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';
import { formatSeconds } from '../utils/timer';

class TimerComponent {
  readonly #ui: HTMLDivElement;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getElement('#timer-block');

    this.#render();

    this.#context.eventEmitter.addHandler(
      'TIMER_UPDATED',
      this.handleTimerUpdated
    );
  }

  handleTimerUpdated = createEventHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.innerText = formatSeconds(this.#context.timerState.seconds);
  }
}

export { TimerComponent };
