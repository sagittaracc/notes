import { TPaginationRequest } from "@/types/pagination";
import { TSort } from "@/types/sort";
import { prisma } from "./prisma";
import { TQuery } from "@/types/provider";

export default abstract class ActiveProvider {
  private readonly searchParams: TPaginationRequest;
  private readonly defaultPage: number = 1;
  private readonly pageSize: number = 5;
  private chunkLength: number = 0;
  private totalCount: number = 0;
  public pageCount: number = 0;
  public currentPage: number;
  public query: TQuery;

  constructor(searchParams: TPaginationRequest) {
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

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  abstract all(): any;
  abstract count(): Promise<number>;

  async fetch() {
    const [data, count] = await prisma.$transaction([
      this.all(),
      this.count()
    ]);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const _data = data as Array<any>;
    this.pageCount = Math.ceil(count / this.pageSize);
    this.chunkLength = _data.length;
    this.totalCount = count;

    return _data;
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