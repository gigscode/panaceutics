import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: '#042f2e',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f0fdfa',
                    fontWeight: 'bold',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                P
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}