const Local_Storage_Keys: LocalStorageKeysObject = {
  refreshToken: 'dynamic-refresh-token',
  accessToken: 'dynamic-access-token',
};

class LocalStorage {
  // Check if a key exists in localStorage const
  static hasItem(key: string): boolean {
    return key in Local_Storage_Keys;
  }

  // Set a value in localStorage
  static set<T = null>(key: LocalStorageKeys, value: T): void {
    if (!this.hasItem(key)) {
      console.error(`Error parsing localStorage value for key "${key}":`);

      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from localStorage with an optional default value
  static get<T = null>(key: LocalStorageKeys, defaultValue?: T): T | null {
    if (!this.hasItem(key)) {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) {
        return defaultValue ?? null;
      }
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        console.error(
          `Error parsing localStorage value for key "${key}":`,
          error
        );
        return defaultValue ?? null;
      }
    } else {
      console.error(`Error parsing localStorage value for key "${key}":`);
      return null;
    }
  }

  // Remove an item from localStorage
  static remove(key: LocalStorageKeys): void {
    if (!this.hasItem(key)) {
      console.error(`Error parsing localStorage value for key "${key}":`);

      return;
    }

    localStorage.removeItem(key);
  }
}

export { LocalStorage };
