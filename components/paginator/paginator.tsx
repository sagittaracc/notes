"use client";

import { range } from '@/lib/array'
import Link from 'next/link'
import React, { FC } from 'react'
import styles from './paginator.module.scss';
import classNames from 'classnames';
import useQueryParams from '@/hooks/useQueryParams';

type TPaginatorProps = {
  currentPage: number
  pageCount: number
  queryParam: string
}

const Paginator: FC<TPaginatorProps> = ({ currentPage, pageCount, queryParam }) => {
  const { createUrlWithParam } = useQueryParams();

  return (
    <div className={`${styles.paginator} flex-row gap-2 font-medium`}>
      {
        range({count: pageCount, startWith: 1})
          .map((page, index) =>
            <Link
              key={index}
              href={createUrlWithParam(queryParam, page)}
              className={
                classNames(
                  'p-1',
                  'decoration-none',
                  {[styles.active]: currentPage == page}
                )
              }>
                {page}
            </Link>)
      }
    </div>
  )
}

export default Paginator