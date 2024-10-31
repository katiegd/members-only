const { Client } = require("pg");
require("dotenv").config();

const dropTables = `DROP TABLE IF EXISTS members, messages, session`;

const createMemberTable = `CREATE TABLE IF NOT EXISTS members (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	firstname varchar(255) NULL,
	lastname varchar(255) NULL,
	username varchar(255) NULL,
	"password" varchar(255) NULL,
	memstatus bool DEFAULT true NULL,
	isadmin bool DEFAULT false NULL,
	CONSTRAINT members_pkey PRIMARY KEY (id)
);
`;

const createMessageTable = `CREATE TABLE IF NOT EXISTS messages (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	title varchar(255) NOT NULL,
	message text NOT NULL,
	"timestamp" timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT messages_pkey PRIMARY KEY (id)
);
`;

const createSessTable = `CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMPTZ NOT NULL,
  PRIMARY KEY ("sid")
);

CREATE INDEX "IDX_sessions_expire" ON "session" ("expire");
`;

const createDemoUsers = `INSERT INTO members (firstname, lastname, username, password, memstatus, isadmin)
VALUES
    ('Alice', 'Smith', 'alice@example.com', '$2a$10$XzZeC.v8YHE5fX8/Ee.CleOuHZxKUb1FZ7V9zLO9vZ4Lz6AYXqpmK', 'true', true),
    ('Bob', 'Jones', 'bob@example.com', '$2a$10$TiMR1t9kQd4DYBt0D5G6bOiApd.jEZmn1X6tO7/8M7WpybF.KuQ/m', 'true', false),
    ('Charlie', 'Brown', 'charlie@example.com', '$2a$10$7UvMFO0ZhDw6zHS9dDrcnOgqIHwXNEXN8N4zF7R7LSCO0XcM8RoXW', 'true', false);`;

const createDemoMessages = `
INSERT INTO messages (user_id, title, message, timestamp)
VALUES
    (1, 'Introduction', 'Hi everyone, I''m Alice and excited to join!', NOW()),
    (2, 'Help Needed', 'I''m stuck on a coding problem, any advice?', NOW()),
    (3, 'Quick Question', 'Anyone familiar with advanced SQL joins?', NOW());`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL_RENDER,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query(dropTables);
    await client.query(createSessTable);
    console.log("Session table created.");
    await client.query(createMemberTable);
    await client.query(createDemoUsers);
    console.log("Member table and users created.");
    await client.query(createMessageTable);
    await client.query(createDemoMessages);
    console.log("Message table and demo messages created.");
  } catch (err) {
    console.error("Error occured: ", err);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
