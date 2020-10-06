import { Bar } from './Bar.type';
import { Foo$Status } from './enums.type';
export type Foo = {
  barId?: number;
  nonRefDataId?: number;
  bar: Bar;
  barNonRef?: Bar;
  baz: number;
  aDate?: Date;
  detailOnly?: string;
  readOnly?: string;
  status?: Foo$Status;
  withValidations?: string;
  withExtra?: string;
  withArray?: Bar[];
  arrayOfPrimitives?: string[];
  arrayOfDates?: Date[];
};
