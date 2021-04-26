import React, { useState } from 'react';
import { Form, Segment, Grid, Button, Message, Divider} from 'semantic-ui-react';


const register = () => {
    const [error, setError] = useState([false, '']);


    const [formData, setFormData] = useState({username: '', password: '', confirmPassword: '' });
    //setup error for 1) email address already taken, username already taken, passwords don't match


    const handleSubmit = () => {
        if (formData.password != formData.confirmPassword){
            setError([true, "Passwords do not match"]);
        }

        //make api request with axios

    }

    const handleChange = (e, {input, value}) => { 
        setFormData({...formData, [e.target.name] : value});
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
                            name = 'password'
                            value={formData.password}
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange = {handleChange}
                        />

                        <Form.Input
                            name = 'confirmPassword'
                            value={formData.confirmPassword}
                            icon='lock'
                            iconPosition='left'
                            label='Confirm Password'
                            type='password'
                            onChange = {handleChange}
                        />
    
                    <Button content='Register' secondary />
                    <Divider/>

                    {error[0] ?
                        <Form error>
                            <Message
                            error
                            header='Registration not Successful'
                            content={error[1]}
                            />
                        </Form>
                    : null}


                </Form>
            </Grid.Column>
        </Grid>
      </Segment>
    );
}


export default register;