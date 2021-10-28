CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4() CHECK (id ~ '^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-z\d#?!@$%^&*-]{6,}$'),
  login VARCHAR(255) NOT NULL CHECK (login ~ '^([A-Za-z]|[0-9]){3,}$'),
  password VARCHAR(255) NOT NULL CHECK (password ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$'),
  age SMALLINT NOT NULL CHECK (age > 3 AND age < 131),
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

SELECT * FROM users;

INSERT INTO users (login, password, age, is_deleted) VALUES
('Diana', 'Password1', 21, FALSE),
('Max', 'Password2', 24, FALSE),
('Mary', 'Password3', 23, FALSE),
('Tom', 'Password4', 25, TRUE);

SELECT * FROM users;