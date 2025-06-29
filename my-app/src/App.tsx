
import { useEffect, useState } from 'react'
import Login from './Login';
import { Link } from 'react-router-dom';
import './App.css'
import Modal from 'react-modal';

type ExSentence = {
  id: number;
  sentence: string;
}


type Word = {
  id: number;
  title: string;
  definition: string;
  example_count: number;
  exSentences: ExSentence[]
};



function App() {
  
  const [words, setWords] = useState<Word[]>([])
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setCount] = useState<number>(0);






  // useEffect(() => {
  //   if (!token) return
  //   const url = search
  //     ? `http://localhost:8000/api/word/words/?search=${encodeURIComponent(search)}`
  //     : 'http://localhost:8000/api/word/words/';

  //   fetch(url, {
  //     headers: { 'Authorization': `Token ${token}` }
  //   })
  //     .then(response => response.json())
  //     .then(data => setWords(data));
  // }, [token, search]);
  useEffect(() => {
    setPage(1);
  }, [search]);
  

  useEffect(() => {
    if (!token) return
    let url = `http://localhost:8000/api/word/words/?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    fetch(url, {
    headers: { 'Authorization': `Token ${token}` }
  })
    .then(response => response.json())
    .then(data => {
      setWords(data.results);      
      setCount(data.count);        
      setTotalPages(Math.ceil(data.count / 50));
    })

  }, [token, search, page])


  const addWord = (wordId: number) => {
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
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setToken(null);
              // Optionally, redirect to home:
              // navigate('/');
            }}
          >
            Sign Out
          </button>
        </div>
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
              <div>{word.example_count}</div>
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
          <div>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
      </div>
    </>
  )
}

export default App
