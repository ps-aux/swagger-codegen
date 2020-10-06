import { Foo } from './Foo.model';
import { Bar } from './Bar.model';
import { WithNoProperties } from './WithNoProperties.model';
export { Foo, Bar, WithNoProperties };
export const apiInfo = {
  version: '123'
};
export const api = {
  Foo,
  Bar,
  WithNoProperties
};
export const allModels = [Foo, Bar, WithNoProperties];
