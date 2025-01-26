import { TPaginationRequest } from "@/types/pagination";
import { TSort } from "@/types/sort";
import { prisma } from "./prisma";
import { TOrderBy } from "@/types/order";

export default abstract class ActiveProvider {
  private readonly defaultPage: number = 1;
  private readonly searchParams: TPaginationRequest;
  public readonly pageSize: number = 5;
  public currentPage: number;
  public pageCount: number;
  private chunkCount: number;
  public totalCount: number;
  public offset: number;
  public limit: number;
  public orderBy: TOrderBy;

  constructor(searchParams: TPaginationRequest) {
    this.searchParams = searchParams;
    this.currentPage = searchParams.page || this.defaultPage;
    this.pageCount = 0;
    this.chunkCount = 0;
    this.totalCount = 0;
    this.offset = (this.currentPage - 1) * this.pageSize;
    this.limit = this.pageSize;
    this.orderBy = [];
  }

  order(column: string, sort: TSort) {
    this.orderBy.push({
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
    this.chunkCount = _data.length;
    this.totalCount = count;

    return _data;
  }

  tooBig(): boolean {
    return this.totalCount > this.pageSize;
  }

  wrongPageWasRequested(): boolean {
    return this.chunkCount === 0 && this.totalCount > 0;
  }

  getLastPage(): number {
    return this.pageCount;
  }
}