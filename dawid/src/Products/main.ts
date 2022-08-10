import { createMicroservice } from 'src/Utils/main';
import { PortPath } from 'src/Utils/port';
import { ProductsModule } from './products.module';

createMicroservice(PortPath.products, ProductsModule);
