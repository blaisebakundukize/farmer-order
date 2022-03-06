import http from 'http';
import { app } from './app';
import config from 'config';
import logger from './utils/logger';
import connect from './utils/connect';

(async () => {
  const port = config.get<number>('port');

  // Make a connection to db
  await connect();

  const server = http.createServer(app);

  server.listen(port, () =>
    logger.info(`App is running at http://localhost:${port}`)
  );
})();
