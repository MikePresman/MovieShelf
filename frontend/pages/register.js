import React, { useState } from 'react';
import { Form, Segment, Grid, Button, Message, Divider} from 'semantic-ui-react';


const register = () => {
    const [error, setError] = useState([false, '']);
    const [formData, setFormData] = useState({username: '', password: '', email: '', confirmPassword: '' });
    //setup error for 1) email address already taken, username already taken, passwords don't match


    const handleSubmit = () => {
        if (formData.password != formData.confirmPassword){
            setError([true, "Passwords do not match"]);
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch("http://localhost:5000/register", requestOptions).then(response => {
            //email already in use
            if (response.ok)
                return response.json();

            if (response.status == 409)
                setError([true, "Username and/or Email already in use"])
            
            //the server throws 400 if jsonschema doesn't match the data type of what was inputted
            if (response.status == 400) 
                setError([true, "Please Enter Valid Data"])

            if (response.status == 500)
                setError([true], "Server Error")

            
            }).then(data => console.log(data)).catch(err => console.log(err));
    
        
    }
    

    const handleChange = (e, {_, value}) => { 
        setFormData({...formData, [e.target.name] : String(value)});
    }


    return (
        <Segment placeholder style = {{"margin": "0px"}}>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name = 'username'
                            value={formData.username}
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            value={formData.username}
                            placeholder='Username'
                            onChange = {handleChange}
                        />

                        <Form.Input
                            name = 'email'
                            value={formData.email}
                            placeholder = "johndoe@gmail.com"
                            icon='mail'
                            iconPosition='left'
                            label='Email'
                            onChange = {handleChange}
                        />

                        <Form.Input
                            name = 'password'
                            value={formData.password}
                            placeholder = "********"
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange = {handleChange}
                        />

                        <Form.Input
                            name = 'confirmPassword'
                            value={formData.confirmPassword}
                            placeholder = "********"
                            icon='lock'
                            iconPosition='left'
                            label='Confirm Password'
                            type='password'
                            onChange = {handleChange}
                        />
    
                    <Button content='Register' secondary />
                    

                    {error[0] ?
                        <>
                        <Divider/>
                        <Form error>
                            <Message
                            error
                            header='Registration not Successful'
                            content={error[1]}
                            />
                        </Form>
                        </>
                    : null}


                </Form>
            </Grid.Column>
        </Grid>
      </Segment>
    );
}


export default register;