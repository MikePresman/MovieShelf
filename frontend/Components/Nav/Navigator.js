import React, { useState, useEffect, useContext } from 'react';
import { Menu, Search, Header, Loader, Dimmer} from 'semantic-ui-react';
import styles from './navigator.module.css'
import { useRouter } from 'next/router';
import UserContext from '../Contexts/UserContext';

const Navigator = () => {
    const router = useRouter()
    const [activeItem, setActiveItem] = useState('Home');
    const [result, setResult] = useState([]);

    const {user, signOut} = useContext(UserContext);

    useEffect(() => {

    }, [])

    //this useEffect handles the naming of which url we are on corresponding to what will be highlighted on the navbar
    useEffect(() => {
        setActiveItem(router.pathname.substring(1,router.pathname.length));
    }, [router.pathname])

    const handleItemClick = (event) => {
        switch (event.target.text) {
            case "Home":
                router.push("/");
                break;
            case "Messages":
                break;
            case "Friends":
                break;
            case "Login":
                router.push("/login");
                break;
            case "Logout":
                signOut();

                break;
            default:
                break;
        }
    };




    const handleSearch = (event) => {
        if (event.target.value.length <= 0) return;
        let arr = [];
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=454a5f6a555d21549c86c51fa91f0a1a&query=+${event.target.value}`).then(resp => resp.json()).then(data => {
            data.results.forEach(element => {
                let description = element.overview;
                let image = "https://image.tmdb.org/t/p/original/" + element.poster_path;
                if (typeof description !== "undefined" && description.length > 0){
                    description = description.substring(0,100) + "...";
                }
                arr.push({
                    key: element.id, 
                    title: element.title,
                    image: image,
                    description : description,
                    price: element.release_date.split("-")[0]
                })});
            setResult(arr.slice(0,5));
        }).catch(err => console.log(err));
    }


    function handleRedirect(event){
        router.push("/movie/" + event.result.key);
    }




    return (
        <div>
            <Menu pointing secondary>

                <Menu.Item>
                    <Header color = "teal" as='h3'>MovieShelf</Header>
                </Menu.Item>

                <Menu.Item
                    name='home'
                    active={activeItem === ''}
                    onClick={handleItemClick}

                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'Messages'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'Friends'}
                    onClick={handleItemClick}
                />

                {user ?
                    <Menu.Menu position='right'>  
                        <Search className = {styles.search} loading = {false} onSearchChange = {handleSearch} results = {result} onResultSelect={(e, data) => handleRedirect(data)}/>
                        <Menu.Item
                            name='Logout'
                            active={activeItem === 'logout'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu> 
                :
                <Menu.Menu position='right'>  
                    <Search className = {styles.search} loading = {false} onSearchChange = {handleSearch} results = {result} onResultSelect={(e, data) => handleRedirect(data)}/>
                    <Menu.Item
                        name='Login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
                }




            </Menu>
        </div>
    );
}

export default Navigator;
