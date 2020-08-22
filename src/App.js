import React, { useEffect, useState } from "react";
import RepositoriesAPI from "./services/api";
import "./styles.css";

function App () {

  const [repositories, setRespositories] = useState([])

  useEffect(() => {
    RepositoriesAPI.get('repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);


  async function handleAddRepository () {

    const response = await RepositoriesAPI.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setRespositories([...repositories, response.data])

  }

  async function handleRemoveRepository (id) {
    RepositoriesAPI.delete(`repositories/${id}`)
      .then(reponse => {
        setRespositories(repositories.filter(repository => repository.id !== id))
      })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
