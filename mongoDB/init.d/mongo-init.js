const fs = require('fs');

function getEnv(envName) {
  return process.env[envName];
}

db.auth(getEnv("MONGO_INITDB_ROOT_USERNAME"), getEnv("MONGO_INITDB_ROOT_PASSWORD"));

db.getSiblingDB(getEnv("MONGO_DB"));

let mongoPassword;
try {
  mongoPassword = fs.readFileSync(getEnv("MONGO_PASSWORD_FILE"), { encoding: 'utf8', flag: 'r' });
} catch(error) {
  printjson(error);
  process.exit(1);
}

if (!mongoPassword) {
  print("Missing mongo password");
  process.exit(1);
}

const user = {
  user: getEnv("MONGO_USER"),
  pwd: mongoPassword,
  roles: [
    {
      role: 'readWrite',
      db: getEnv("MONGO_DB"),
    },
  ],
}

db.createUser(user);