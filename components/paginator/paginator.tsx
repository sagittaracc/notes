import { range } from '@/lib/array'
import Link from 'next/link'
import React, { FC } from 'react'
import styles from './paginator.module.scss';

type TPaginatorProps = {
  currentPage: number
  pageSize: number
  totalCount: number
}

const Paginator: FC<TPaginatorProps> = ({ currentPage, pageSize, totalCount }) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div className={`${styles.paginator} flex-row gap-2 p-2 font-medium`}>
      {
        range({count: pageCount, startWith: 1})
          .map((page, index) =>
            <Link
              key={index}
              href={`/?page=${page}`}
              className={`p-1 decoration-none ${currentPage == page ? styles.active : ''}`}>
                {page}
            </Link>)
      }
    </div>
  )
}

export default Paginator