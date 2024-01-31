import { createContext, useContext, useState } from 'react';
import Modal from '../components/layout/Modal';

export const NavbarContext = createContext(null);

export default function NavbarContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <Modal />
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  const context = useContext(NavbarContext);

  if (!context) throw new Error('No context');

  return context;
}
