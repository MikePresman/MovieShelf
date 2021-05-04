import React, { useState, useEffect, useContext } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/router';
import {localStorageService} from '../Services/AxiosManager';
import api from '../Services/AxiosManager';

import UserContext from '../Components/Contexts/UserContext';


const login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({username: '', password: ''});
    const {user, message, warningMessage} = useContext(UserContext);

    useEffect(() => {
        //onComponentDidUnAmount to remove the warning message, cleaner this way
        return() => {
            warningMessage(null);
        }
    }, [])

    const handleLogin = () => {
        api.post('/login', formData).then(resp => {
            console.log(resp)
            localStorageService.setToken({access_token: resp.data.access_token, refresh_token: resp.data.refresh_token});
            localStorage.setItem("username", resp.data.username);
            localStorage.setItem("user_id", resp.data.id);
            router.push('/');
        }, error => console.log(error));
    }

    const handleRedirect = () => {router.push("/register");}


   const handleChange = (e, {_, value}) => { 
        setFormData({...formData, [e.target.name] : String(value)});
    }


    return (
        <Segment placeholder style = {{"margin": "0px", "height": "96vh"}}>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit = {handleLogin}>
                    {/* //warning message only when they have been redirected from a protected route */}
                    { message ? <Divider horizontal>  {message} </Divider>: null}
                        <Form.Input
                            name = 'username'
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            placeholder='Username'
                            onChange = {handleChange}
                        />

                        <Form.Input
                            name = 'password'
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange = {handleChange}
                        />

                        <Button content='Login' primary />
                        <Divider horizontal> OR</Divider>
                    </Form>
                    <Form onClick = {handleRedirect}>
                        <Button content='Sign up' icon='signup' size='big' />
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    );

}


export default login;
