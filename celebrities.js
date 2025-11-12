const express = require('express');
const router = express.Router();
// Demo in-memory celebrities store
const celebs = [
  { id: '1', name: 'Demo Artist', genre: 'Afrobeat', base_fee: 5000, verified: true, events: [] }
];

router.get('/', (req, res) => res.json(celebs));
router.get('/:id', (req, res) => {
  const c = celebs.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

module.exports = router;
