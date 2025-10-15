import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Icon component
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            width: '70%',
            height: '70%',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
