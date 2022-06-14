import React from 'react';
import {Navbar , Container} from 'react-bootstrap';

export default function Header(){

    return(
        <>
         <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <Navbar.Brand href="/">Pokedex</Navbar.Brand>
            </Container>
          </Navbar>
        </>
    )
}