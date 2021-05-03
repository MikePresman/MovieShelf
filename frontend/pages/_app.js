import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Navigator from '../Components/Nav/Navigator';
import UserContext from '../Components/Contexts/UserContext';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);

  const signIn = (username, id) => {
    setUser({[username]: username, [id]: id})
  }
  
  const signOut = () => {
    setUser(undefined); 
  }


  return (
    <>
    <UserContext.Provider value = {{user:user, signIn: signIn}}>
        <Navigator/>
        <Component {...pageProps} />
    </UserContext.Provider>
  </>
  );
}

export default MyApp
