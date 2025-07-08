// // UserContext.js

// import { createContext } from 'react';
// import { TOKEN_STORAGE_ID } from '../Hooks/LocalStorage';

// const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => {},
// });

// export default UserContext;


// UserContext.js
import { createContext, useState, useEffect } from 'react';
import useLocalStorage, { TOKEN_STORAGE_ID } from '../Hooks/LocalStorage';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  setToken: () => {}
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const { id, username, isAdmin, isLeagueAdmin, isTeamAdmin } = jwtDecode(token);
        setCurrentUser({ id, username, isAdmin, isLeagueAdmin, isTeamAdmin });
      } catch (e) {
        console.error("Invalid token", e);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
