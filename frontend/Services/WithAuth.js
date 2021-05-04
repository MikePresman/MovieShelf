import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useRouter } from 'next/router';
import UserContext from '../Components/Contexts/UserContext';
import api from '../Services/AxiosManager';
import { route } from 'next/dist/next-server/server/router';



const WithAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [allowed, setAllowed] = useState(false);

        useEffect(() => {
                api.post("/auth-check")
                .then(resp => resp.data)
                .then(_ => setAllowed(true))
                .catch(err => {
                    console.log(err);
                    router.push("/login");
                });
            
        }, [] )
        


        return (
            <>
            {!allowed ? <h1>Loading</h1> : <WrappedComponent {...props}/>}
            
                
            
            </>
        )
        
        
        
        
    }
  
}

export default WithAuth;