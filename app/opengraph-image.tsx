import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Panaceutics - Phytotherapeutic Solutions'
export const size = {
    width: 1200,
    height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#042f2e',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f0fdfa',
                    padding: 48,
                }}
            >
                <div style={{
                    fontSize: 64,
                    fontWeight: 'bold',
                    marginBottom: 24,
                }}>
                    Panaceutics
                </div>
                <div style={{
                    fontSize: 36,
                    textAlign: 'center',
                    maxWidth: 800,
                }}>
                    Where the cure is natural, but the proof is scientific.
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}