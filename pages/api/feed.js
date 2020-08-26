// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { name, email, blogUrl, feedUrl, notes } = req.body;
  const Airtable = require('airtable');
  const base = new Airtable({ apiKey: process.env.APIKEY }).base('appsUwvXxOvBuCCz0');

  base('Table 1').create([{ fields: { name, email, blogUrl, feedUrl, notes } }], (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
      return;
    }
  });

  res.status(201).json({
    success: true,
  });
};
