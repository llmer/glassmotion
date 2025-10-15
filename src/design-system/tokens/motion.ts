/**
 * GlassMotion Animation Tokens
 * Timing curves and duration values
 */

export const motion = {
  // Easing curves
  curves: {
    // Standard motion for most transitions
    standard: 'cubic-bezier(0.32, 0.72, 0, 1)',

    // Entry animations (ease out)
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',

    // Exit animations (ease in)
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',

    // Bouncy spring for emphasis
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Duration values
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Component-specific animations
  components: {
    button: {
      hover: {
        duration: '200ms',
        curve: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      press: {
        duration: '100ms',
        curve: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
    card: {
      enter: {
        duration: '350ms',
        curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scale: { from: 0.95, to: 1.0 },
      },
      exit: {
        duration: '200ms',
        curve: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
    menu: {
      slideIn: {
        duration: '300ms',
        curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      slideOut: {
        duration: '200ms',
        curve: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
    modal: {
      backdrop: {
        duration: '250ms',
        curve: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      content: {
        duration: '300ms',
        curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
} as const

export type MotionTokens = typeof motion

// Helper to generate transition strings
export const createTransition = (
  properties: string | string[],
  duration: keyof typeof motion.duration = 'normal',
  curve: keyof typeof motion.curves = 'standard'
): string => {
  const props = Array.isArray(properties) ? properties : [properties]
  const d = motion.duration[duration]
  const c = motion.curves[curve]

  return props.map(prop => `${prop} ${d} ${c}`).join(', ')
}
