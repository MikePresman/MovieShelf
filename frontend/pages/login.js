import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useRouter } from 'next/router';
import {localStorageService} from '../Services/AxiosManager';
import api from '../Services/AxiosManager'

const login = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({username: '', password: ''});

    const handleLogin = () => {
        api.post('/login', formData).then(resp => {
            console.log(resp)
            localStorageService.setToken({access_token: resp.data.access_token, refresh_token: resp.data.refresh_token});
            router.push('/');
        }, error => console.log(error));
    }


    //contextAPI to handle the logged in user (their username, and maybe id)

    


    const handleRedirect = () => {router.push("/register");}


   const handleChange = (e, {_, value}) => { 
        setFormData({...formData, [e.target.name] : String(value)});
    }




    return (
        <Segment placeholder style = {{"margin": "0px"}}>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit = {handleLogin}>
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
