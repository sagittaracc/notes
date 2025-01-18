import { range } from '@/lib/array'
import Link from 'next/link'
import React, { FC } from 'react'

type TPaginatorProps = {
  currentPage: number
  pageSize: number
  totalCount: number
}

const Paginator: FC<TPaginatorProps> = ({ currentPage, pageSize, totalCount }) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      {
        range(pageCount)
          .map((page, index) =>
            <Link
              key={index}
              href={`/?page=${page + 1}`}
              className={currentPage == page + 1 ? 'active' : ''}>
                {page + 1}
            </Link>)
      }
    </>
  )
}

export default Paginator