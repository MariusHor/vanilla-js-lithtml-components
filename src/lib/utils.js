export const activateObserver = ({ self, callbacks }) => {
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach(node => {
          if (node.dataset?.bind === self.id) {
            callbacks.disconnected();
          }

          const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, null, false);

          while (treeWalker.nextNode()) {
            const childNodeId = treeWalker.currentNode.dataset?.bind;

            if (childNodeId === self.id) {
              callbacks.disconnected();
            }
          }
        });
      }

      if (mutation.type === 'attributes' && mutation.attributeName === 'data-bind') {
        if (mutation.oldValue === self.id) {
          callbacks.disconnected();
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
  });
};

export const setEvent = (event, callback) => {
  document.addEventListener(event, callback);
};

export const debounce = (cb, delay) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
