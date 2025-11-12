-- Minimal SQL schema for CelebConnect (Postgres)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  role TEXT NOT NULL,
  profile JSONB,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS celebrities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  bio TEXT,
  base_fee NUMERIC,
  verified BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  celebrity_id UUID REFERENCES celebrities(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  type TEXT,
  note TEXT
);
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  celebrity_id UUID REFERENCES celebrities(id),
  organizer_id UUID REFERENCES users(id),
  venue TEXT,
  city TEXT,
  start_timestamp TIMESTAMP,
  end_timestamp TIMESTAMP,
  ticket_price NUMERIC,
  ticket_capacity INTEGER,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  celebrity_id UUID REFERENCES celebrities(id),
  organizer_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending',
  deposit_amount NUMERIC,
  total_amount NUMERIC,
  contract_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  purchaser_id UUID REFERENCES users(id),
  purchase_amount NUMERIC,
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT now()
);
