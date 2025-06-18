const {Client} = require("pg");
const bcrypt = require("bcryptjs");
const {argv} = require("node:process");



async function main() {

    const result = await Promise.all([
        bcrypt.hash(argv[6], 10),
        bcrypt.hash(argv[7], 10),
        bcrypt.hash(argv[8], 10)
    ]);

    const [deletedUserPwd, memberPwd, adminPwd] = result;
    
    
    let SQL = [
        "CREATE TABLE user_session ( ",
        'sid varchar NOT NULL COLLATE "default",',
        "sess json NOT NULL,",
        "expire timestamp(6) NOT NULL",
        ")",
        "WITH (OIDS=FALSE);",
        "ALTER TABLE user_session ADD CONSTRAINT u_session_pk PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;",
        "CREATE INDEX IDX_session_expire ON user_session (expire);",
        "",
        "CREATE TABLE users ( ",
        "id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,",
        "firstname VARCHAR(255) NOT NULL,",
        "lastname VARCHAR(255) NOT NULL,",
        "username VARCHAR(255) NOT NULL,",
        "password VARCHAR(255) NOT NULL,",
        "member BOOLEAN DEFAULT false,",
        "admin BOOLEAN DEFAULT false",
        ");",
        "",
        "CREATE TABLE messages ( ",
        "id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,",
        "text VARCHAR(500) NOT NULL,",
        "title VARCHAR(100) NOT NULL,",
        "timestamp TIMESTAMP DEFAULT LOCALTIMESTAMP",
        ");",
        "",
        "CREATE TABLE user_messages ( ",
        "id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,",
        "user_id INTEGER DEFAULT 0,",
        "message_id INTEGER NOT NULL,",
        "CONSTRAINT fk_user_id FOREIGN KEY (user_id)",
        "REFERENCES users(id) ON DELETE SET DEFAULT,",
        "CONSTRAINT fk_message_id FOREIGN KEY (message_id)",
        "REFERENCES messages(id) ON DELETE CASCADE",
        ");",
        "",
        "CREATE TABLE membership_pwd ( ",
        "id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,",
        "password VARCHAR(255) NOT NULL",
        ");",
        "",
        "CREATE TABLE admin_pwd ( ",
        "id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,",
        "password VARCHAR(255) NOT NULL",
        ");",
        "",
        "INSERT INTO users (id, firstname, lastname, username, password, member) ",
        "OVERRIDING SYSTEM VALUE VALUES ",
        `(0, 'Deleted', 'User', 'deleteduser', '${deletedUserPwd}', false);`,
        "",
        `INSERT INTO membership_pwd (password) VALUES ('${memberPwd}');`,
        "",
        `INSERT INTO admin_pwd (password) VALUES ('${adminPwd}');`
    ];

    SQL = SQL.join("");


    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${argv[4]}:${argv[5]}@${argv[2]}/${argv[3]}`
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
};


main();
