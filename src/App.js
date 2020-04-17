import React, { useEffect, useState } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRespositories(response.data);    
    });
  
  },[]);

  async function handleAddRepository() {
    const result = await api.post("repositories",{
      "title":`Desafio node JS ${Date.now()}`,
      "url":"http://github.com/",
      "techs":["Node.js"]	
    });
    const repositorie = result.data;
    setRespositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const index = repositories.findIndex(repositorie => repositorie.id === id);
      console.log(index);
      const newrepositories = repositories;
      newrepositories.splice(index,1);
      console.log(newrepositories);
      setRespositories([...newrepositories]);
      console.log('Apagado com sucesso!');
    }else{
      alert('Ocorreu um erro tente novamente mais tarde');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">   
      {    
        repositories.map( repositorie =>
          <li key={repositorie.id}>           
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>   
        )         
      }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
