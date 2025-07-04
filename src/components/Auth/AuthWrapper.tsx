import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';

type AuthView = 'login' | 'register' | 'forgot-password';

const AuthWrapper: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');

  // If user is authenticated, don't render auth pages
  if (user) {
    return null;
  }

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');
  const switchToForgotPassword = () => setCurrentView('forgot-password');

  switch (currentView) {
    case 'register':
      return <RegisterPage onSwitchToLogin={switchToLogin} />;
    case 'forgot-password':
      return <ForgotPasswordPage onSwitchToLogin={switchToLogin} />;
    case 'login':
    default:
      return (
        <LoginPage 
          onSwitchToRegister={switchToRegister}
          onSwitchToForgotPassword={switchToForgotPassword}
        />
      );
  }
};

export default AuthWrapper;