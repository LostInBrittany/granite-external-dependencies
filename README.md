[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/LostInBrittany/granite-external-dependencies)

# granite-external-dependencies

A set of elements and mixins to grab external dependencies (CSS and JS...)

## GraniteCssInjector mixin

A mixin to load external CSS files and dynamically inject them in the Shadow DOM of the element.

Elements using this mixing must override two static getters :

- `nodeModulesPath`: this getter returns the relative path to the `node_modules` folder
- `cssFiles`: this getter returns an array with an object for every dependency.
  The dependency object need `name` and `path` propeties, where the path is the dependency relative path from 
  `node_modules` folder

Examples: 

```js
  static get nodeModulesPath() {
    return `${GraniteExternalDependencies.pathFromUrl(import.meta.url)}../../../`;
  }

  static get cssFiles() {
      return [
          { 
            name: 'externalCss', 
            path: `@granite-elements/granite-external-dependencies/demo/external-css.css` 
          }
      ];
  }
```  
