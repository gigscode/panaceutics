import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Panaceutics - Panacea|Therapeutics Solutions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
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
                    padding: '48px',
                }}
            >
                <div style={{
                    fontSize: '64px',
                    fontWeight: 'bold',
                    marginBottom: '24px',
                }}>
                    Panaceutics
                </div>
                <div style={{
                    fontSize: '36px',
                    textAlign: 'center',
                    maxWidth: '800px',
                }}>
                    Where the cure is natural, but the proof is scientific.
                </div>
            </div>
        ),
        { ...size }
    )
}