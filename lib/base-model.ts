import { TOrderBy } from "@/types/order";
import { TSort } from "@/types/sort";

abstract class BaseModel
{
  protected offset?: number;
  protected limit?: number;
  protected orderBy: TOrderBy = [];
  
  static model<T extends BaseModel>(this: new () => T): T {
    return new this();
  }
  
  setOffset(offset: number) {
    this.offset = offset;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  order(column: string, sort: TSort) {
    this.orderBy.push({
      [column]: sort
    });
  }

  abstract query(): Promise<[object[], number]>;
}

export default BaseModel;