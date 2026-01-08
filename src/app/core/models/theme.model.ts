export type ThemeName =
  | 'dark'
  | 'light'
  | 'midnight'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'purple'
  | 'rose'
  | 'nord'
  | 'gruvbox';

export interface ThemeConfig {
  name: string;
  bg: string;
  text: string;
  border: string;
  card: string;
  hover: string;
  input: string;
  accent: string;
  preview: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  dark: {
    name: 'Dark',
    bg: 'bg-zinc-950',
    text: 'text-zinc-100',
    border: 'border-zinc-800',
    card: 'bg-zinc-900',
    hover: 'hover:bg-zinc-800',
    input: 'bg-zinc-900',
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    preview: 'bg-zinc-950',
  },
  light: {
    name: 'Light',
    bg: 'bg-white',
    text: 'text-zinc-900',
    border: 'border-zinc-200',
    card: 'bg-zinc-50',
    hover: 'hover:bg-zinc-100',
    input: 'bg-white',
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    preview: 'bg-white',
  },
  midnight: {
    name: 'Midnight',
    bg: 'bg-slate-950',
    text: 'text-slate-100',
    border: 'border-slate-800',
    card: 'bg-slate-900',
    hover: 'hover:bg-slate-800',
    input: 'bg-slate-900',
    accent: 'bg-blue-600 hover:bg-blue-700',
    preview: 'bg-slate-950',
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-cyan-950',
    text: 'text-cyan-50',
    border: 'border-cyan-800',
    card: 'bg-cyan-900',
    hover: 'hover:bg-cyan-800',
    input: 'bg-cyan-900',
    accent: 'bg-cyan-600 hover:bg-cyan-700',
    preview: 'bg-cyan-950',
  },
  forest: {
    name: 'Forest',
    bg: 'bg-green-950',
    text: 'text-green-50',
    border: 'border-green-800',
    card: 'bg-green-900',
    hover: 'hover:bg-green-800',
    input: 'bg-green-900',
    accent: 'bg-green-600 hover:bg-green-700',
    preview: 'bg-green-950',
  },
  sunset: {
    name: 'Sunset',
    bg: 'bg-orange-950',
    text: 'text-orange-50',
    border: 'border-orange-800',
    card: 'bg-orange-900',
    hover: 'hover:bg-orange-800',
    input: 'bg-orange-900',
    accent: 'bg-orange-600 hover:bg-orange-700',
    preview: 'bg-orange-950',
  },
  purple: {
    name: 'Purple Haze',
    bg: 'bg-purple-950',
    text: 'text-purple-50',
    border: 'border-purple-800',
    card: 'bg-purple-900',
    hover: 'hover:bg-purple-800',
    input: 'bg-purple-900',
    accent: 'bg-purple-600 hover:bg-purple-700',
    preview: 'bg-purple-950',
  },
  rose: {
    name: 'Rose',
    bg: 'bg-rose-950',
    text: 'text-rose-50',
    border: 'border-rose-800',
    card: 'bg-rose-900',
    hover: 'hover:bg-rose-800',
    input: 'bg-rose-900',
    accent: 'bg-rose-600 hover:bg-rose-700',
    preview: 'bg-rose-950',
  },
  nord: {
    name: 'Nord',
    bg: 'bg-slate-900',
    text: 'text-slate-100',
    border: 'border-slate-700',
    card: 'bg-slate-800',
    hover: 'hover:bg-slate-700',
    input: 'bg-slate-800',
    accent: 'bg-sky-600 hover:bg-sky-700',
    preview: 'bg-slate-900',
  },
  gruvbox: {
    name: 'Gruvbox',
    bg: 'bg-yellow-950',
    text: 'text-yellow-50',
    border: 'border-yellow-800',
    card: 'bg-yellow-900',
    hover: 'hover:bg-yellow-800',
    input: 'bg-yellow-900',
    accent: 'bg-yellow-600 hover:bg-yellow-700',
    preview: 'bg-yellow-950',
  },
};
