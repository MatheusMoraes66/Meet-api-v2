export const environment = {
    server: { port: process.env.SERVER_PORT || 8081 },
    db: { url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/meat-api' },
    security: { saltRounds: process.env.SALT_ROUNDS || 10 }
}