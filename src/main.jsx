import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App.jsx';

// Error tracking initialization
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
  // Initialize Sentry for error tracking
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: process.env.NODE_ENV,
    release: process.env.REACT_APP_VERSION,
  });

  // Disable console logs in production
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

// Internationalization setup
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Auth Provider (if using authentication)
import { AuthProvider } from './context/AuthContext';

// Redux Provider (if using Redux)
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

// Query Client Provider (if using React Query)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Sentry.ErrorBoundary fallback={<p>An error occurred</p>} showDialog>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <I18nextProvider i18n={i18n}>
                  <ThemeProvider>
                    <BrowserRouter>
                      <App />
                      {process.env.NODE_ENV === 'production' && (
                        <>
                          <Analytics />
                          <SpeedInsights />
                        </>
                      )}
                    </BrowserRouter>
                  </ThemeProvider>
                </I18nextProvider>
              </AuthProvider>
            </QueryClientProvider>
          </ReduxProvider>
        </HelmetProvider>
      </Sentry.ErrorBoundary>
    </ErrorBoundary>
  </StrictMode>
);

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful');
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err);
        Sentry.captureException(err);
      }
    );
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };
  
  // You can pass a function to log the results
  reportWebVitals((metric) => {
    console.log(metric);
    // Optionally send metrics to analytics in development
    if (process.env.REACT_APP_DEBUG_ANALYTICS === 'true') {
      // Example: Send to your analytics
    }
  });
}

// Offline detection
window.addEventListener('offline', () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage('Application went offline', 'warning');
  }
  // You could also trigger a custom offline UI here
});

window.addEventListener('online', () => {
  // Handle when connection is restored
});

// Beforeunload event for analytics
window.addEventListener('beforeunload', () => {
  // Send any final analytics data
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
  }
};

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(event.reason);
  }
});
