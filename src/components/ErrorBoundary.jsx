import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleCopyError = () => {
    const errorText = `Error: ${this.state.error?.toString()}\n\nStack: ${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(errorText);
    alert("Error details copied to clipboard!");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            padding: '2rem',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            maxWidth: '600px',
            width: '100%'
          }}>
            <h1 style={{ color: '#d4af37', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
              The cinematic experience encountered a small glitch. Our team has been notified.
            </p>
            
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem',
              borderRadius: '12px',
              textAlign: 'left',
              fontSize: '0.8rem',
              overflow: 'auto',
              maxHeight: '200px',
              marginBottom: '1.5rem',
              color: '#ff4444',
              fontFamily: 'monospace',
              border: '1px solid rgba(255, 68, 68, 0.2)'
            }}>
              {this.state.error && this.state.error.toString()}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px',
                  background: '#d4af37',
                  border: 'none',
                  color: '#000',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleCopyError}
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Copy Error Info
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
