import {React, useEffect, useState} from 'react';

import {
    Box,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/react"

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
    const [comicDetails, setComicDetails] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect( () =>{
        axios(`http://gateway.marvel.com/v1/public/comics?ts=${time}&apikey=${publicKey}&hash=${hash}`).then((response) => {
            setComics(response.data.data.results)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [time, publicKey, hash])

    function setInfoModal (comic){
        setComicDetails(comic)
        onOpen()
    }

    return(
        <div>
            <div className="title">
                <h1>OUR COMICS</h1>
            </div>
            {isLoading ? (
                <div className="load">
                    <Spinner color="red.500" size="xl"/>
                </div>
            ):(
                <div className="cards" >
                {comics.map((comic, index) =>(
                    <div key={index} >
                        <button onClick={() => setInfoModal(comic)}>
                            <Box display="flex" alignItems="baseline" >
                                <img src={comic.thumbnail.path+"/portrait_xlarge.jpg"} alt={comic.title}/>
                                <Box
                                        color="gray.500"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                    <p>{comic.title}</p> 
                                </Box>
                            </Box>
                        </button>
                    </div>
                ))}
            </div>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{comicDetails.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {comicDetails.description || "No description"}
                    </ModalBody>
                            
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        
    )
}