# vanilla-js-lithtml-components

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Screenshot

![](./src/assets/live-site-screenshot.png)

### Links

- [Live Site Demo](https://vanilla-js-lit-html-components.netlify.app/)
- [Code Repository](https://github.com/MariusHor/vanilla-js-lithtml-components)

### Features

- Reusable and customizable components
- Lifecycle methods implemented with the MutationObserver API
- Efficient rendering using lit-html
- Mini-apps like a Tic-Tac-Toe game, a Notes app, a Filterable Table, a Clock, a Temperature Calculator, and a Counter
- Display of active components on the page

## My process

### Built with

- mobile-first workflow
- semantic HTML5 markup
- scss
- javaScript
- lit-html
- webpack

### What I learned

Through this project, I learned how to create reusable and customizable components in vanilla JavaScript. I also gained a deeper understanding of how the MutationObserver API works and how it can be used to implement lifecycle methods in components.

I also learned about lit-html and how it can be used to create efficient and dynamic templates that update only the parts that have changed. This can help improve the performance of the application and reduce the amount of unnecessary re-renderings.

I started this project by creating a basic Component class that all other components will inherit from. The Component class has lifecycle methods like "onConnected" and "onDisconnected" that are called when a component is added or removed from the DOM. I have also learned about the difference between debouncing and throttling function calls to control how many times we allow a function to be executed over time and based on the needs of the app I implemented the first one when calling the rerendering of the app. 

As I wanted to test some real-life use cases I created several mini-apps like Tic-Tac-Toe, Notes app, etc. through the use of reusable components. These components use lit-html templates to render their UI and are easily customizable with props.

I also created another Counter component that keeps track of the number of active components on the page updating itself as we add or remove components from the page.

### Continued development

In the future, I would like to add more mini-apps to this project and further refine the existing components. I would also like to explore other libraries and frameworks for creating reusable components and see how they compare to this approach.

### Useful resources

- [lit-html documentation](https://lit.dev/docs/libraries/standalone-templates/)
- [MutationObserver API documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Author

- Github - [@MariusHor](https://github.com/MariusHor/)
- Frontend Mentor - [@MariusHor](https://www.frontendmentor.io/profile/MariusHor)
