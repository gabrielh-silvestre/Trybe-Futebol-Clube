import * as express from 'express';

import loginRouter from './routes/userRouter';
import teamsRouter from './routes/teamRouter';

import errorHandler from './middleware/error/handler';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  }

  private routes(): void {
    this.app.use(express.json());

    this.app.get('/', (_req, res) => res.json({ message: 'Hello World!' }));
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);

    this.app.use(errorHandler);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
