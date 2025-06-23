import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function MyWords() {
    const [userWords, setUserWords] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
    fetch('http://localhost:8000/api/words/userWords/', {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => response.json())
      .then(data => setUserWords(data));
  }, [token]);

  return (
        <div>
            <div style={{ marginBottom: '1em' }}>
                <Link to="/">
                    <button>Back to All Words</button>
                </Link>
            </div>

      <h1>My Words</h1>
      <ul>
        {userWords.map(uw => (
          <li key={uw.id}>{uw.word.title}</li>
        ))}
      </ul>
    </div>
  );

}

export default MyWords;
