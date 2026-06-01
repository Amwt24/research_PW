import type { ProfileData } from '../schemas/profileSchema';

const getInitialState = (): ProfileData => {
  try {
    const item = typeof window !== 'undefined' ? window.localStorage.getItem('profile_store') : null;
    if (item) return JSON.parse(item);
  } catch (error) {
    // Ignore error
  }
  return { name: '', email: '', bio: '' };
};

let storeState: ProfileData = getInitialState();

const listeners = new Set<() => void>();

export const profileStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return storeState;
  },
  setProfile(nextState: Partial<ProfileData>) {
    storeState = { ...storeState, ...nextState };
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('profile_store', JSON.stringify(storeState));
      }
    } catch (error) {
      // Ignore
    }
    listeners.forEach((l) => l());
  }
};
