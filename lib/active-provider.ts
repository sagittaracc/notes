import { TPaginationRequest } from "@/types/pagination";
import { TSort } from "@/types/sort";

type TPrismaQuery = {
  skip: number
  take: number
  orderBy: Array<{
    [key: string]: TSort
  }>
}

export default abstract class ActiveProvider {
  readonly defaultPage: number = 1;
  readonly pageSize: number = 5;
  readonly searchParams: TPaginationRequest;
  currentPage: number;
  prismaQuery: TPrismaQuery;

  constructor(searchParams: TPaginationRequest) {
    this.searchParams = searchParams;
    this.currentPage = searchParams.page || this.defaultPage;
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

  abstract count(): Promise<number>;

  async tooBig(): Promise<boolean> {
    return await this.count() > this.pageSize;
  }
}