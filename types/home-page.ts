import { TPaginationRequest } from "./pagination";

export interface IHomePageRequest {
  searchParams: Promise<TPaginationRequest>
}