const express = require('express');
const router = express.Router();
const events = [
  { id: '101', title: 'Demo Concert', celebrity_id: '1', venue: 'Stadium', city: 'Johannesburg', start_timestamp: new Date().toISOString() }
];

router.get('/', (req, res) => res.json(events));
router.get('/:id', (req, res) => {
  const e = events.find(x => x.id === req.params.id);
  if (!e) return res.status(404).json({ error: 'Not found' });
  res.json(e);
});

module.exports = router;
