import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Apple Touch Icon component
export default function AppleIcon() {
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
            width: '60%',
            height: '60%',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '3px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
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
