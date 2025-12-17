import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

function UserProvider({ children }) {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuarioRegistrado(null);
  };

  const handleRegister = (usuario) => {
    setUsuarioRegistrado(usuario);
  };

  const value = {
    usuarioRegistrado,
    setUsuarioRegistrado,
    isLoggedIn,
    setIsLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
