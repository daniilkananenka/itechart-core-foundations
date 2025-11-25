import { AVAILABLE_COLORS, Color, COLORS_CONFIG } from '../constants/color';
import { Context } from '../state/context';
import { getElement } from '../utils/component';
import { createEventHandler } from '../utils/event-emitter';

class ColorButtonsComponent {
  readonly #ui: HTMLDivElement;
  readonly #context: Context;
  #buttons: HTMLButtonElement[];

  constructor({ context }: { context: Context }) {
    this.#context = context;

    this.#ui = getElement('#color-selectors-grid');
    this.#buttons = [];

    this.#createButtons();
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
    this.#buttons.forEach((button, index) => {
      const color = AVAILABLE_COLORS[index];

      button.style.backgroundColor = COLORS_CONFIG[color].background;
      button.style.borderColor = COLORS_CONFIG[color].border;

      button.disabled = !this.#context.gameState.isGameStarted;
    });
  }

  #attachListeners() {
    this.#buttons.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (!this.#context.gameState.isGameStarted) return;

        this.#context.roundState.checkAnswer(AVAILABLE_COLORS[index]);
      });
    });
  }

  #createButtons() {
    this.#ui.replaceChildren();
    this.#buttons = [];

    const fragment = document.createDocumentFragment();

    AVAILABLE_COLORS.forEach(() => {
      const button = document.createElement('button');
      button.className = 'color-selector-button';

      fragment.appendChild(button);
      this.#buttons.push(button);
    });

    this.#ui.appendChild(fragment);
  }
}

export { ColorButtonsComponent };
