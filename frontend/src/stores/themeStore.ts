import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('buildranchi-theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  // Default to dark for the premium brand feel
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('buildranchi-theme', theme);
  // Also set class for any libraries that use class-based detection
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
}

export const useThemeStore = create<ThemeState>((set) => {
  const initial = getInitialTheme();
  // Apply on store creation (before React renders)
  if (typeof window !== 'undefined') {
    applyTheme(initial);
  }

  return {
    theme: initial,
    toggleTheme: () =>
      set((state) => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return { theme: next };
      }),
    setTheme: (theme) => {
      applyTheme(theme);
      set({ theme });
    },
  };
});