export default {
  loadingSpinnerWrap: {
    width: '100%',
    padding: '150px 0',
  },
  loadingSpinner: {
    display: 'block',
    margin: '0 auto',
    fill: '#000',
  },
  circle: {
    animationName: 'upAndDown',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(.05, .2, .35, 1)',
    '&:nth-child(2)': {
      animationDelay: '.18s',
    },
    '&:nth-child(3)': {
      animationDelay: '.36s',
    },
  },
  '@keyframes upAndDown': {
    '0%': { opacity: 0, transform: 'translateY(0)' },
    '25%': { opacity: 1, transform: 'translateY(-10px)' },
    '75%': { opacity: 1, transform: 'translateY(-10px)' },
    '100%': { opacity: 0, transform: 'translateY(0)' },
  },
}
