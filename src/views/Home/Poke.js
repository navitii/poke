import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {Container,Spinner,Card,Button,Accordion, Table} from 'react-bootstrap';
import {getPokeData} from "./../../api/Request";
import { useParams } from "react-router-dom";


export default function Poke(){
  const params = useParams();
  const {name} = params;
  const [pokemon, setPokemon] = useState({})
  const [loading , setloading] = useState(true);

  useEffect(() => {
    getPoke();
  }, []);

  const getPoke = async() =>{
    const res = await getPokeData(name);
    console.log(res);
    setPokemon(res);
    setloading(false);
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

    return(
        <>
          <Header />

          <Container>
            <div className='text-center' style={{
               marginTop: '20px',
               marginBottom: '20px'
            }}>
              <h2>Pokemon</h2>
            </div>
            {
              (loading) ? <>
              <div className='text-center'>
                <Spinner animation="border" variant="dark" />
              </div>
             </>:
             <>
              <center>
               <Card>
                <div className='row'>
                <div className='col'>
                  <Card.Img variant="top" style={{ width: 'auto', height: '250px' }} src={pokemon.sprites.front_default} />
                </div>
                <div className='col'>
                  <Card.Img variant="top" style={{ width: 'auto', height: '250px' }} src={pokemon.sprites.front_shiny}/>
                </div>
                </div>
                <Card.Body>
                  <Card.Title>Informacion</Card.Title>
                  <Card.Text>
                  <Table bordered={ false }>
                      <tr>
                        <th>ID:</th>
                        <td>{pokemon.id}</td>
                      </tr>
                      <tr>
                        <th>Nombre:</th>
                        <td>{capitalizarPrimeraLetra(pokemon.name)}</td>
                      </tr>
                      <tr>
                        <th>Tipos:</th>
                        <td> 
                          <ul>
                              {
                                pokemon.types.map((t,i) => (
                                  <li key={i}>{capitalizarPrimeraLetra(t.type.name)}</li>
                                ))
                              }
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th>Peso:</th>
                        <td>{pokemon.weight * 0.1}</td>
                      </tr>
                      <tr>
                        <th>Altura:</th>
                        <td>{pokemon.height * 0.1}</td>
                      </tr>
                      <tr>
                        <th>Habilidades:</th>
                        <td>
                          <ul>
                              {
                                pokemon.abilities.map((h,i) => (
                                  <li key={i}>{capitalizarPrimeraLetra(h.ability.name)}</li>
                                ))
                              }
                            </ul>
                        </td>
                            
                        
                      </tr>
                    </Table>
                    <Accordion defaultActiveKey="0">
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>Movimientos</Accordion.Header>
                                <Accordion.Body>
                                  {
                                    pokemon.moves.map((m,i) => (
                                      <li key={i}>{capitalizarPrimeraLetra(m.move.name)}</li>
                                    ))
                                  }
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>  
                  </Card.Text>
                  <Button href="/home"variant="primary">Volver</Button>
                </Card.Body>
              </Card>
              </center>
             </>
            }
          </Container>
        </>
    )
}