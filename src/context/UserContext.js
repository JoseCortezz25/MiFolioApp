import React, { useEffect } from 'react';
import { getToken, deleteToken, getCurrentUser } from '../utils/helpers';
import { getUser } from '../services/user';

const UserContext = React.createContext();

export function UserContextProvider(props) {
  const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }

      try {
        const data = await getUser(getCurrentUser());
        setUser(data);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
      
    }
    loadUser();
  }, [])

  const logout = () => {
    setUser(null);
    deleteToken();
  }

  const value = React.useMemo(() => {
    return {
      user,
      loadingUser,
      logout
    }
  }, [user, loadingUser])

  return <UserContext.Provider value={ value } { ...props } />
}

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserContextProvider');
  return context;
}

export default UserContext;