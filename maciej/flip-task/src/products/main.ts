import { createMicroservice } from '~/utils';
import { ProductsModule } from './products.module';

createMicroservice(ProductsModule, 'products');
