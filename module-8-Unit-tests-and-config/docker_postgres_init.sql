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

INSERT INTO users (login, password, age, is_deleted) VALUES
('Diana', 'Password1', 21, FALSE),
('Max', 'Password2', 24, FALSE),
('Mary', 'Password3', 23, FALSE),
('Tom', 'Password4', 25, TRUE);

SELECT * FROM users;

CREATE TABLE IF NOT EXISTS groups (
  id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4() CHECK (id ~ '^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-z\d#?!@$%^&*-]{6,}$'),
  name VARCHAR(255) NOT NULL UNIQUE,
  permissions VARCHAR(12)[] NOT NULL DEFAULT '{READ}',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO groups (name) VALUES
('test group 1');

INSERT INTO groups (name, permissions) VALUES
('test group 2', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);

SELECT * FROM groups;

CREATE TABLE IF NOT EXISTS usergroups (
  id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4() CHECK (id ~ '^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-z\d#?!@$%^&*-]{6,}$'),
  user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id VARCHAR(255) NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

SELECT * FROM usergroups;
