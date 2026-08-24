import { useState } from 'react';

const API_URL = 'https://url-shortner-5cdl.onrender.com';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h1>URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Paste a long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          style={{ width: '100%', padding: 8, fontSize: 16 }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '8px 16px' }}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <p style={{ marginTop: 20 }}>
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;