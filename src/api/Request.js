import axios from "axios";

export async function getPokesData(){
  try{
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      return res.data.results;
  }
  catch(err){
      return err.response
  }
}

export async function getPokeData(name){
  try{
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res.data;
  }
  catch(err){
      return err.response
  }
}

