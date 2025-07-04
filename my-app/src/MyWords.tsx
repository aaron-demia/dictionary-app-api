import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type UserWord = {
  id: number;
  word_detail: {
    title: string;
    definition: string;
  };
};

function MyWords() {
    const [userWords, setUserWords] = useState<{ results: UserWord[]; count: number  }>({ results: [], count: 0 });
    const [token] = useState(localStorage.getItem('token'));
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 50; // match your backend


    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/word/userWords/?page=${page}`, {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => response.json())
      .then(data => setUserWords(data));
  }, [token, page]);



  return (
        <div>
            <div style={{ marginBottom: '1em' }}>
                <Link to="/">
                    <button>Back to All Words</button>
                </Link>
            </div>

      <h1>My Words</h1>
        <div>
          {userWords.results.length === 0 && <div>No words found.</div>}
          {userWords.results.map(uw => (
              <div key={uw.id} style={{ marginBottom: '1em', padding: '0.5em', border: '1px solid #ccc' }}>
              <strong>{uw.word_detail.title}</strong>
              <div>{uw.word_detail.definition}</div>
              </div>
          ))}
        </div>
        <div style={{ marginBottom: '1em' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
          <span> Page {page} of {Math.ceil(userWords.count / PAGE_SIZE) || 1} </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(userWords.count / PAGE_SIZE)}
            >Next</button>
        </div>
    </div>
  );

}

export default MyWords;
