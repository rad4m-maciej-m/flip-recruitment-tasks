import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';

export const registerDatabase = (entities: Array<{ new (): void }> = []) => {
  const cfg = config();

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: cfg.db.host,
    port: cfg.db.port,
    username: cfg.db.user,
    password: cfg.db.password,
    database: cfg.db.database,
    entities,
    synchronize: true,
  });
};
