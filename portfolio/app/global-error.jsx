'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦷</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Something went wrong!
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              {error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
