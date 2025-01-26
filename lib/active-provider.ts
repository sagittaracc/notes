import { TPaginationRequest } from "@/types/pagination";
import { TSort } from "@/types/sort";
import { ActiveRecord, TQuery } from "@/types/provider";

export default class ActiveProvider {
  private readonly model: ActiveRecord;
  private readonly searchParams: TPaginationRequest;
  private readonly defaultPage: number = 1;
  private readonly pageSize: number = 5;
  private chunkLength: number = 0;
  private totalCount: number = 0;
  public pageCount: number = 0;
  public currentPage: number;
  public query: TQuery;

  constructor(model: ActiveRecord, searchParams: TPaginationRequest) {
    this.model = model;
    this.searchParams = searchParams;
    this.currentPage = this.searchParams.page || this.defaultPage;
    this.query = {
      offset: (this.currentPage - 1) * this.pageSize,
      limit: this.pageSize,
      orderBy: [],
    }
  }

  order(column: string, sort: TSort) {
    this.query.orderBy.push({
      [column]: sort
    });

    return this;
  }

  async fetch() {
    const [data, count] = await this.model(this.query);

    this.pageCount = Math.ceil(count / this.pageSize);
    this.chunkLength = data.length;
    this.totalCount = count;

    return data;
  }

  tooBig(): boolean {
    return this.totalCount > this.pageSize;
  }

  wrongPageWasRequested(): boolean {
    return this.chunkLength === 0 && this.totalCount > 0;
  }

  getLastPage(): number {
    return this.pageCount;
  }
}