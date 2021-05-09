import React, { useEffect, useState, useContext} from 'react';
import api from '../../Services/AxiosManager';
import {Grid, Image, Button} from 'semantic-ui-react'
import WithAuth from '../../Services/WithAuth';
import UserContext from '../../Components/Contexts/UserContext';
import { useRouter } from 'next/router';

const profile = () => {
    const [avatarSeed, setAvatarSeed] = useState('123');
    const {user, signOut} = useContext(UserContext);
    const router = useRouter();

    //This works fine for now, but can be hardended later
    useEffect(() => {
         if (user.username !== router.query.profile)
            router.push('/');
    }, [])
    
    useEffect(() => {
        api.get("/get-avatar").then().then(resp => {
            if (resp.data.avatar !== "None")
                setAvatarSeed(resp.data.avatar)}
            ).catch(err => err);
    }, [])
            
    const saveAvatar = () => {
        api.post("/set-avatar", {"seed": avatarSeed}).then().then(resp => console.log(resp)).catch(err => console.log(err));
    }

    const generateNewSeed = () => {
        const seed = Math.random().toString(36).substring(7)
        setAvatarSeed(seed);
    }

    return (
        <Grid columns={2}>
        <Grid.Column>
          <Image
          size = "small"
            label={{ as: 'a', corner: 'left', icon: 'save' }}
            src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`}
            onClick = {saveAvatar}
          />
          <Grid.Row>
          <Button size = "small" onClick = {generateNewSeed}>Generate New Avatar</Button>
          </Grid.Row>
        </Grid.Column>
        </Grid>    
    );
}

export default WithAuth(profile);