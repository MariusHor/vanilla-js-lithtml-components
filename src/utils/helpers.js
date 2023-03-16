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
