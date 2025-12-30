export const LIGHT_COLORS = {
  // Primary colors
  primary: '#FF6C37',
  primaryHover: '#FF5722',
  primaryLight: '#FFE8DF',

  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#F7F7F7',
  backgroundLight: '#FAFAFA',

  // Sidebar colors
  sidebarBg: '#252629',
  sidebarText: '#CCCCCC',
  sidebarHover: '#2E2F33',
  sidebarActive: '#3A3B40',

  // Text colors
  textPrimary: '#212121',
  textSecondary: '#6B6B6B',
  textMuted: '#A0A0A0',
  textWhite: '#FFFFFF',

  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  borderDark: '#BDBDBD',

  // Status colors
  success: '#49CC90',
  error: '#F93E3E',
  warning: '#FCA130',
  info: '#61AFFE',

  // Response status colors
  status1xx: '#6B6B6B',
  status2xx: '#49CC90',
  status3xx: '#61AFFE',
  status4xx: '#FCA130',
  status5xx: '#F93E3E',

  // Editor colors
  editorBg: '#1E1E1E',
  editorText: '#D4D4D4',
  editorLineNumber: '#858585',

  // Other colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  divider: '#E8E8E8',

  // Diff colors
  diffAdded: '#22C55E',
  diffAddedBg: '#F0FDF4',
  diffRemoved: '#EF4444',
  diffRemovedBg: '#FEF2F2',
  diffModified: '#F59E0B',
  diffModifiedBg: '#FFFBEB',
  diffUnchanged: '#6B7280',
} as const;

export const DARK_COLORS = {
  // Primary colors
  primary: '#FF7A4D',
  primaryHover: '#FF6C37',
  primaryLight: '#4A2C1F',

  // Background colors
  background: '#1A1A1A',
  backgroundDark: '#0F0F0F',
  backgroundLight: '#242424',

  // Sidebar colors
  sidebarBg: '#0F0F0F',
  sidebarText: '#B0B0B0',
  sidebarHover: '#1F1F1F',
  sidebarActive: '#2A2A2A',

  // Text colors
  textPrimary: '#E8E8E8',
  textSecondary: '#B0B0B0',
  textMuted: '#707070',
  textWhite: '#FFFFFF',

  // Border colors
  border: '#333333',
  borderLight: '#2A2A2A',
  borderDark: '#404040',

  // Status colors
  success: '#5FD99F',
  error: '#FF5252',
  warning: '#FFB347',
  info: '#70BAFF',

  // Response status colors
  status1xx: '#909090',
  status2xx: '#5FD99F',
  status3xx: '#70BAFF',
  status4xx: '#FFB347',
  status5xx: '#FF5252',

  // Editor colors
  editorBg: '#0F0F0F',
  editorText: '#D4D4D4',
  editorLineNumber: '#6E6E6E',

  // Other colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  divider: '#2A2A2A',

  // Diff colors
  diffAdded: '#34D399',
  diffAddedBg: '#1A3A2A',
  diffRemoved: '#F87171',
  diffRemovedBg: '#3A1A1A',
  diffModified: '#FBBF24',
  diffModifiedBg: '#3A2F1A',
  diffUnchanged: '#9CA3AF',
} as const;

export type ColorScheme = {
  readonly primary: string;
  readonly primaryHover: string;
  readonly primaryLight: string;
  readonly background: string;
  readonly backgroundDark: string;
  readonly backgroundLight: string;
  readonly sidebarBg: string;
  readonly sidebarText: string;
  readonly sidebarHover: string;
  readonly sidebarActive: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textMuted: string;
  readonly textWhite: string;
  readonly border: string;
  readonly borderLight: string;
  readonly borderDark: string;
  readonly success: string;
  readonly error: string;
  readonly warning: string;
  readonly info: string;
  readonly status1xx: string;
  readonly status2xx: string;
  readonly status3xx: string;
  readonly status4xx: string;
  readonly status5xx: string;
  readonly editorBg: string;
  readonly editorText: string;
  readonly editorLineNumber: string;
  readonly overlay: string;
  readonly shadow: string;
  readonly divider: string;
  readonly diffAdded: string;
  readonly diffAddedBg: string;
  readonly diffRemoved: string;
  readonly diffRemovedBg: string;
  readonly diffModified: string;
  readonly diffModifiedBg: string;
  readonly diffUnchanged: string;
};

export const getColors = (mode: 'light' | 'dark'): ColorScheme => {
  return mode === 'light' ? LIGHT_COLORS : DARK_COLORS;
};


// For backward compatibility
export const COLORS = LIGHT_COLORS;

