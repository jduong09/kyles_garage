CREATE TYPE status AS ENUM ('internal', 'external');

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  status status NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);