import React, { useEffect, createContext, useState, useMemo, useContext } from 'react';
import { getToken, deleteToken, getCurrentUser } from '../utils/helpers';
import { getUser } from '../services/user';

const UserContext = createContext()

export function UserContextProvider(props) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

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

  const handleSetCurrentUser = async (idUser) => {
    try {
      console.log(idUser);
      const data = await getUser(idUser);
      setUser(data);
    } catch (error) {
      console.log('ERROR', error);
    }
  }

  const value = useMemo(() => {
    return {
      user,
      loadingUser,
      logout,
      handleSetCurrentUser
    }
  }, [user, loadingUser])

  return <UserContext.Provider value={ value } { ...props } />
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserContextProvider');
  return context;
}

export default UserContext;