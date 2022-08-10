type GetEnv = {
  (name: string, defaultValue: string): string;
  (name: string, defaultValue: number): number;
};

const getEnv = ((name, defaultValue) => {
  if (typeof defaultValue === 'number') {
    return (
      parseInt(process.env[name] || String(defaultValue), 10) || defaultValue
    );
  }

  return process.env[name] || defaultValue;
}) as GetEnv;

export const config = () => {
  return {
    port: {
      http: getEnv('PORT_HTTP', 3000),
      service: {
        orders: getEnv('PORT_SERVICE_ORDERS', 3001),
        products: getEnv('PORT_SERVICE_PRODUCTS', 3002),
        tasks: getEnv('PORT_SERVICE_TASKS', 3003),
        users: getEnv('PORT_SERVICE_USERS', 3004),
      },
    },
    db: {
      host: getEnv('DB_HOST', 'localhost'),
      user: getEnv('DB_USER', 'user'),
      password: getEnv('DB_PASSWORD', 'password'),
      database: getEnv('DB_DATABASE', 'flip-task'),
      port: getEnv('DB_PORT', 5432),
    },
  };
};
