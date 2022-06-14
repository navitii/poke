import React, {useEffect, useState} from 'react';
//import { Link } from "react-router-dom";
import Header from '../../components/Header';
import {Container, Table, Button, Spinner,InputGroup,FormControl} from 'react-bootstrap';
import {getPokesData} from "./../../api/Request";

export default function Home(){
    const [pokes, setPokes] = useState([]);
    const [data, setData] = useState([]);
    const [loading , setloading] = useState(true);
    const [search , setSearch] = useState('');

    useEffect(() => {
        getPokes();
      }, []);

    const getPokes = async () => {
        const res = await getPokesData();
        setPokes(res);
        setData(res);
        setloading(false);
    }

    //filtro
    const handleSearch = (text) => {
      if(text){
        const newData = pokes.filter((item) =>{
          const txtData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
          const textData = text.toUpperCase();
          return txtData.indexOf(textData) > -1;
        });
        setSearch(text);
        setData(newData);
      }
      else{
        setData(pokes);
        setSearch(text);
      }
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
              <h2>Pokemons</h2>
            </div>

            <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Busca tu pokemon"
                value={search}
                onChange={(val) => handleSearch(val.target.value)}
              />
            </InputGroup>
            </div>
            

            {
              (loading) ? <>
               <div className='text-center'>
                 <Spinner animation="border" variant="dark" />
               </div>
              </>:

              <>
               <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                  
                 data.map( (p,i) => (
                  <tr key ={p}>
                    <td>{i+1}</td>
                    <td>
                      <img src ={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`} alt="..." width="auto" height="100"></img>
                    </td>
                    <td>{capitalizarPrimeraLetra(p.name)}</td>
                    <td><Button href={`/poke/${p.name}`} variant="primary">Ver Mas</Button>{' '}</td>
                  </tr>
                 ) )
                }
                  </tbody>
                  </Table>
              </>
            } 
          </Container>
        </>
    )
}