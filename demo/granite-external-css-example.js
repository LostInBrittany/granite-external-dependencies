import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { GraniteCssInjector } from '../granite-css-injector.js'

/**
 * `granite-external-css-example`
 * A mset of elements and mixins to grab external dependencies (CSS and JS...)
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GraniteExternalCssExample extends GraniteCssInjector(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'granite-external-css-example',
      },
    };
  }

  static get nodeModulesPath() {
    return `${GraniteExternalCssExample.pathFromUrl(import.meta.url)}../../../`;
  }

  static get cssFiles() {
      return [
          { 
            name: 'externalCss', 
            path: `@granite-elements/granite-external-dependencies/demo/external-css.css` 
          }
      ];
  }
}

window.customElements.define('granite-external-css-example', GraniteExternalCssExample);
