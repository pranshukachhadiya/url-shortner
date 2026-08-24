require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {nanoid} = require('nanoid');
const pool = require('./db');

app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('URL Shortner API is running.');
});

app.post('/shorten', async (req, res) =>{
    const { url } = req.body;

    if(!url){
        return res.status(400).json({error: 'url is required'});
    }

    const code = nanoid(6);

    try{
        await pool.query(
            'INSERT INTO urls (code, long_url) VALUES ($1, $2)',
            [code, url]
        );
        
        const shortUrl = `${req.protocol}://${req.get('host')}/${code}`;
        res.status(201).json({ shortUrl });
    } catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong'});
    }
});

app.get('/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      'SELECT long_url FROM urls WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(302, result.rows[0].long_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);  
})

