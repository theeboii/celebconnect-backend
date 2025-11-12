const express = require('express');
const router = express.Router();
const bookings = [];
router.post('/', (req, res) => {
  const { event_id, celebrity_id, organizer_id, total_amount } = req.body;
  if (!event_id || !celebrity_id || !organizer_id) return res.status(400).json({ error: 'Missing fields' });
  const b = { id: (bookings.length+1).toString(), event_id, celebrity_id, organizer_id, total_amount, status: 'pending', created_at: new Date() };
  bookings.push(b);
  res.json(b);
});

router.get('/:id', (req, res) => {
  const b = bookings.find(x => x.id === req.params.id);
  if (!b) return res.status(404).json({ error: 'Not found' });
  res.json(b);
});

module.exports = router;
