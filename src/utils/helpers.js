export const saveStateToStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const loadStateFromStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load state from local storage', error);
    return undefined;
  }
};

export const toggleActive = (list, target, className) => {
  list.forEach(item => item.classList.remove(className));
  target.classList.add(className);
};
