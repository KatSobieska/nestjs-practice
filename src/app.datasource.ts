import { DataSource, DataSourceOptions } from 'typeorm';
import config = require('./ormconfig');

export const AppDataSource = new DataSource(config as DataSourceOptions);
