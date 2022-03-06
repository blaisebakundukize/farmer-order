import http from 'http';
import { app } from './app';
import config from 'config';
import logger from './utils/logger';

(() => {
  const port = config.get<number>('port');

  const server = http.createServer(app);

  server.listen(port, () =>
    logger.info(`App is running at http:localhost:${port}`)
  );
})();
