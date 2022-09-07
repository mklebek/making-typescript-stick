import fetch from 'node-fetch';

function $(selector: string): any {
  return {
    html(arg: string): string {
      const element = document.body.querySelector(selector);
      if (element) {
        element.innerHTML = arg;
      }
      return arg;
    },
    hide() {
      const element = document.body.querySelector(
        selector
      ) as HTMLButtonElement;
      if (element && element.style) {
        element.style.visibility = 'hidden';
      }
    },
    show() {
      const element = document.body.querySelector(
        selector
      ) as HTMLButtonElement;
      if (element && element.style) {
        element.style.visibility = 'visible';
      }
    },
    on(method: string, callback: EventListenerOrEventListenerObject) {
      const element = document.body.querySelector(
        selector
      ) as HTMLButtonElement;
      if (element) {
        element.addEventListener(method, callback);
      }
    },
  } as any;
}

namespace $ {
  export function ajax(...args: any[]): any {
    const [options] = args;
    const { url, success } = options;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        success(responseJSON);
        return responseJSON;
      });
  }
}

export default $;
