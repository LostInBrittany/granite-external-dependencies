import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let _GraniteCssInjector = (baseClass) => {

    let cssFiles = []; 

    function getCSS(nodeModulesPath) {
        cssFiles.forEach(async (file) => {
            let response = await fetch(`${nodeModulesPath}${file.path}`);
            file.css = await response.text();
            console.log('[GraniteCssInjector] getCSS', file.name, file.path, file.css);
            document.dispatchEvent(new CustomEvent(`${file.name}-css-available`, {detail: file.css}));
        });
    } 

    return class extends baseClass {
        constructor() {
            super();
            if (cssFiles.length == 0) {
                cssFiles = this.constructor.cssFiles;
                getCSS(this.constructor.nodeModulesPath);
            }
        }

        connectedCallback() {
            super.connectedCallback();

            cssFiles.forEach((file) =>{
                if (file.css) {
                    if (this.debug) {
                      console.log(`[GraniteCssInjector] connectedCallback - CSS ${file.name} already available`);
                      this.shadowRoot.querySelector('style').appendChild(document.createTextNode(file.css));
                    }
                } else {
                    if (this.debug) {
                      console.log(`[GraniteCssInjector] connectedCallback - CSS ${file.name} not yet available`);
                    }
                    document.addEventListener(`${file.name}-css-available`, (evt) => {
                      console.log(`[GraniteCssInjector] connectedCallback - received CSS ${file.name} available method`);
                      this.shadowRoot.querySelector('style').appendChild(document.createTextNode(file.css));
                    });
                }
            });
        }

        static get cssFiles() {
            return [
                { name: 'cssFile', path: 'moduleName/cssFile.css' }
            ];
        }

        static pathFromUrl(url) {
            return url.substring(0, url.lastIndexOf('/') + 1);
        }

        static get nodeModulesPath() {
            return `${this.pathFromUrl(import.meta.url)}../../`;
        }
    };
};

export const GraniteCssInjector = dedupingMixin(_GraniteCssInjector);
