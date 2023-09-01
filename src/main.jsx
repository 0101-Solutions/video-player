import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CookieConsentComponent from './components/CookieConsent'
import { ToastNotification } from './components/Toast'

const acceptCookies = () => {
  document.cookie = "cookieConsent=true; max-age=31536000; path=/";
};

// Check if cookieConsent is set to true
// If so we can hide the cookie consent banner
const cookieConsent = document.cookie.split(';').some((item) => item.trim().startsWith('cookieConsent='));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          {cookieConsent ? null : <CookieConsentComponent
            cookieName="cookieConsent"
            location="none"
            buttonText="Accept Cookies"
            overlay
            overlayClasses="overlayclass"
            handleCookieAccept={acceptCookies}
          />}
          <ToastNotification />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
