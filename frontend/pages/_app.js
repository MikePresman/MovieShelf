import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Navigator from '../Components/Nav/Navigator';
import UserContext from '../Components/Contexts/UserContext';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState();

  //we set contextAPI data here to avoid flushing it on new requests
  useEffect(() => {
      setUser({username: localStorage.getItem("username"), id: localStorage.getItem("user_id")});
  },[])

  //effectively useless, since we use the above method but we'll keep it cause why not
  const signIn = (username, id) => {
    setUser({[username]: username, [id]: id})
  }
  
  //needs to be called on signout for HOC withAuth
  const signOut = () => {
    setUser(undefined); 
  }
  

  //Implement this logic into /login which will populate a message saying you must login in order to access this page
  const warningMessage = (msg) => {
    setMessage(msg);
  }


  return (
    <>
    <UserContext.Provider value = {{user:user, message: message, signIn: signIn, signOut: signOut, warningMessage: warningMessage}}>
        <Navigator/>
        <Component {...pageProps} />
    </UserContext.Provider>
  </>
  );
}

export default MyApp
