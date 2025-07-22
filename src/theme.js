import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6',
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
      primary: '#6C63FF',
      secondary: '#FF6584',
      dark: '#1A202C',
      light: '#F7FAFC'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
      secondary: 'linear-gradient(135deg, #FF6584 0%, #FFB347 100%)',
      dark: 'linear-gradient(135deg, #2D3748 0%, #805AD5 100%)'
    }
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace"
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em'
  },
  shadows: {
    soft: '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
    glow: '0 0 15px rgba(108, 99, 255, 0.5)',
    deep: '0 4px 12px rgba(0, 0, 0, 0.15)',
    button: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
    darkGlow: '0 0 15px rgba(159, 122, 234, 0.5)'
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.6)'
        },
        _hover: {
          transform: 'translateY(-2px)'
        },
        _active: {
          transform: 'scale(0.98)'
        }
      },
      sizes: {
        lg: {
          fontSize: 'md',
          px: 8,
          py: 6,
          h: 'auto'
        }
      },
      variants: {
        glow: {
          boxShadow: '0 4px 14px 0 rgba(108, 99, 255, 0.39)',
          _hover: {
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.5)'
          }
        }
      }
    },
    Container: {
      baseStyle: {
        maxW: 'container.lg'
      }
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'brand.50' : 'brand.900',
        color: props.colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900',
        transition: 'background-color 0.3s ease'
      },
      '::selection': {
        bg: 'brand.500',
        color: 'white'
      }
    })
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
    cssVarPrefix: 'dm'
  }
});