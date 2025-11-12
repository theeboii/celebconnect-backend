const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// NOTE: This is a demo in-memory store. Replace with real DB.
const users = [];

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, name, email, password_hash: hash, role };
  users.push(user);
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
