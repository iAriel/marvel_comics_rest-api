import {React, useEffect, useState} from 'react';
import { Box } from "@chakra-ui/react"
import axios from 'axios';
import md5 from 'md5';

import './index.css'

export default function Cards (){
    const privateKey ='22e5a9014af0f1b501f8ddb93fbfd007b902af9a';
    const publicKey ='1dff886f9dc0e62c2169d5500268429d';
    
    const time = Number(new Date());
    const hash = md5(time + privateKey+publicKey);
    
    
    const [comics,setComics] = useState([])
    const [isLoading, setLoading] = useState(true);
    
    useEffect( () =>{
        axios(`http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`).then((response) => {
            setComics(response.data.data.results)
            console.log(comics)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    return(
        <div>
            <div className="title">
                <h1>OUR COMICS</h1>
            </div>

            <div className="cards">
                {comics.map(comic =>(
                    <Box display="flex" alignItems="baseline">
                       <img src={comic.thumbnail.path+"/portrait_xlarge.jpg"} />
                       <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            <p>{comic.name}</p> 
                        </Box>
                    </Box>
                ))}
            </div>
            
        </div>
        
    )
}