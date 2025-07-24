import React from 'react';
import { AuthProvider } from './useAuthContext';
import { DarkModeProvider } from './useDarkModeContext';
import { ControlProvider } from './useControlContext';


export const ContextProvider:  React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    
      <AuthProvider>
          <ControlProvider>
          
            <DarkModeProvider>
              {children}
            </DarkModeProvider>
          
          </ControlProvider>
        </AuthProvider>
    
  );
};


