import { useState } from 'react';
import api from './services/api';
import { FiSearch } from 'react-icons/fi';
import './style.css';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});


   async function handleSearch() {
    if(input === ''){
      alert("Preencha algum cep!");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert("CEP não encontrado!");
      setInput('');

    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">

        <input type="text" 
        placeholder="Digite seu cep..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}/>

        <button className="buttonpesquisar" 
        onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}
      
      <div className="rodape">
        <a>Desenvolvido por <a className="link" href="https://www.linkedin.com/in/luiz-gustavo-290992276/">Luiz Gustavo</a></a>
        </div>
      
    </div>
    
  );
}

export default App;
