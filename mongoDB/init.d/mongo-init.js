function getEnv(envName) {
  return process.env[envName];
}

db.auth(getEnv("MONGO_INITDB_ROOT_USERNAME"), getEnv("MONGO_INITDB_ROOT_PASSWORD"))

db.getSiblingDB(getEnv("MONGO_DB"))

const user = {
  user: getEnv("MONGO_USER"),
  pwd: getEnv("MONGO_PASSWORD"),
  roles: [
    {
      role: 'readWrite',
      db: getEnv("MONGO_DB"),
    },
  ],
}

db.createUser(user);