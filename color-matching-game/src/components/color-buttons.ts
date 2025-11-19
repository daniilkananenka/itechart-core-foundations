import { AVAILABLE_COLORS, Color, COLORS_CONFIG } from '../constants/color';
import { Context } from '../state/context';
import { getAllElements } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class ColorButtonsComponent {
  readonly #ui: NodeListOf<HTMLButtonElement>;
  readonly #context: Context;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#ui = getAllElements('.color-selector-button');

    this.#attachListeners();
    this.#render();

    this.#context.eventEmitter.addHandler(
      'GAME_STARTED',
      this.handleGameStarted
    );
    this.#context.eventEmitter.addHandler('GAME_STOPED', this.handleGameStoped);
  }

  handleGameStarted = createEventHandler(() => {
    this.#render();
  }, this);

  handleGameStoped = createEventHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.forEach((element, index) => {
      const color = AVAILABLE_COLORS[index];

      element.style.backgroundColor = COLORS_CONFIG[color].background;
      element.style.borderColor = COLORS_CONFIG[color].border;

      element.disabled = !this.#context.gameState.isGameStarted;
    });
  }

  #attachListeners() {
    this.#ui.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (!this.#context.gameState.isGameStarted) return;

        this.#context.roundState.checkAnswer(AVAILABLE_COLORS[index]);
      });
    });
  }
}

export { ColorButtonsComponent };
