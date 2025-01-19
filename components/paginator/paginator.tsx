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
    <div className={styles.paginator}>
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
    </div>
  )
}

export default Paginator