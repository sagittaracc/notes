import { TPaginationRequest } from "@/types/pagination";
import { TSort } from "@/types/sort";
import { prisma } from "./prisma";

type TPrismaQuery = {
  skip: number
  take: number
  orderBy: Array<{
    [key: string]: TSort
  }>
}

export default abstract class ActiveProvider {
  private readonly defaultPage: number = 1;
  private readonly searchParams: TPaginationRequest;
  public readonly pageSize: number = 5;
  public currentPage: number;
  public pageCount: number;
  private chunkCount: number;
  public totalCount: number;
  prismaQuery: TPrismaQuery;

  constructor(searchParams: TPaginationRequest) {
    this.searchParams = searchParams;
    this.currentPage = searchParams.page || this.defaultPage;
    this.pageCount = 0;
    this.chunkCount = 0;
    this.totalCount = 0;
    this.prismaQuery = {
      skip: (this.currentPage - 1) * this.pageSize,
      take: this.pageSize,
      orderBy: []
    };
  }

  order(column: string, sort: TSort) {
    this.prismaQuery.orderBy.push({
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