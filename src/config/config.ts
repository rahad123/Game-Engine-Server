const config = {
  app: {
    name: process.env.APP_NAME ?? 'game_engine',
    port: process.env.PORT ?? 3000,
    environment: process.env.NODE_ENV ?? 'dev',
  },
  db: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/game-engine',
  },
};

export { config };
