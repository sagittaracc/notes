import { TPaginationRequest } from "@/types/pagination";
import BaseModel from "./base-model";

export default class ActiveProvider {
  private readonly model: BaseModel;
  private readonly searchParams: TPaginationRequest;
  private readonly defaultPage: number = 1;
  private readonly pageSize: number = 5;
  private chunkLength: number = 0;
  private totalCount: number = 0;
  public pageCount: number = 0;
  public currentPage: number;

  constructor(model: BaseModel, searchParams: TPaginationRequest) {
    this.model = model;
    this.searchParams = searchParams;
    this.currentPage = this.searchParams.page || this.defaultPage;
    this.model.setOffset((this.currentPage - 1) * this.pageSize);
    this.model.setLimit(this.pageSize);
  }

  async fetch<T>(): Promise<T[]> {
    const [data, count] = await this.model.query<T>();

    this.pageCount = Math.ceil(count / this.pageSize);
    this.chunkLength = data.length;
    this.totalCount = count;

    return data;
  }

  getModel() {
    return this.model;
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