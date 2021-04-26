import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'


const login = () => {
    









    return (
        <Segment placeholder style = {{"margin": "0px"}}>
        <Grid columns={1} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
              />
    
              <Button content='Login' primary />
              <Divider horizontal> OR</Divider>
              <Button content='Sign up' icon='signup' size='big' />
            </Form>
          </Grid.Column>
    
        </Grid>
    
        
      </Segment>
    );

}


export default login;
