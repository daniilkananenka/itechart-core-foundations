function createComponentHandler(callback: () => void, thisArg: object) {
  return callback.bind(thisArg);
}

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(
      `Element with ${selector} selector was not found in document`
    );
  }

  return element;
}

function getAllElements<T extends Element>(selector: string): NodeListOf<T> {
  const element = document.querySelectorAll<T>(selector);

  return element;
}

export { createComponentHandler, getElement, getAllElements };
