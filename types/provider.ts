import { TOrderBy } from "./order"

export type TQuery = {
  offset: number
  limit: number
  orderBy: TOrderBy
}

export type ActiveRecord = (query: TQuery) => Promise<[Object[], number]>;