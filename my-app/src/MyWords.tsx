import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function MyWords() {
    const [userWords, setUserWords] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
    // fetch('http://localhost:8000/api/words/userWords/', {
    fetch('http://127.0.0.1:8000/api/word/userWords/', {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => response.json())
      .then(data => setUserWords(data));
  }, [token]);

  console.log(userWords);

  return (
        <div>
            <div style={{ marginBottom: '1em' }}>
                <Link to="/">
                    <button>Back to All Words</button>
                </Link>
            </div>

      <h1>My Words</h1>
        <div>
        {userWords.map(uw => (
            <div key={uw.id} style={{ marginBottom: '1em', padding: '0.5em', border: '1px solid #ccc' }}>
            <strong>{uw.word_detail.title}</strong>
            <div>{uw.word_detail.definition}</div>
            </div>
        ))}
        </div>
    </div>
  );

}

export default MyWords;
