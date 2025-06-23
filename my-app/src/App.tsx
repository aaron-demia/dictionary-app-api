
import { useEffect, useState } from 'react'
import Login from './Login';
import MyWords from './MyWords';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import Modal from 'react-modal';
const navigate = useNavigate();


Modal.setAppElement('#root');

function App() {

  const [words, setWords] = useState([])
  const [selectedWord, setSelectedWord] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [search, setSearch] = useState('')

  useEffect(() => {
    const url = search
      ? `http://localhost:8000/api/word/words/?search=${encodeURIComponent(search)}`
      : 'http://localhost:8000/api/word/words/';

    fetch(url, {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => response.json())
      .then(data => setWords(data));
  }, [token, search]);


  const addWord = (wordId) => {
    fetch('http://localhost:8000/api/word/userWords/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({ word: wordId })
    })
   .then(res => {
        if (res.ok) {
          alert("Word added!");
        } else {
          alert("Failed to add word.");
        }
      });

  }




  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div>
        <div style={{ marginBottom: '1em' }}>
          <Link to="/my-words">
           <button>My Words</button>
          </Link>
        </div>

        <input
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1em', padding: '0.5em', width: '100%' }}
        />

        <h1>Words</h1>
          {words.map(word => (
            <div key={word.id} style={{ marginBottom: '1em', padding: '0.5em', border: '1px solid #ccc' }} onClick={() => setSelectedWord(word)}>
              <strong>{word.title}</strong>
              <div>{word.definition}</div>
            </div>
          ))}
          <Modal
            isOpen={!!selectedWord}
            onRequestClose={() => setSelectedWord(null)}
            contentLabel="Word Details"
          >
                    {selectedWord && (
          <div>
            <h2>{selectedWord.title}</h2>
            <p>{selectedWord.definition}</p>
            <h3>Example Sentences</h3>
            <ul>
              {selectedWord.exSentences && selectedWord.exSentences.length > 0 ? (
                selectedWord.exSentences.map(sent => (
                  <li key={sent.id}>{sent.sentence}</li>
                ))
              ) : (
                <li>No example sentences.</li>
              )}
            </ul>
            <button onClick={() => addWord(selectedWord.id)}>Add Word</button>
            <button onClick={() => setSelectedWord(null)}>Close</button>
          </div>
        )}
          </Modal>
      </div>
    </>
  )
}

export default App
