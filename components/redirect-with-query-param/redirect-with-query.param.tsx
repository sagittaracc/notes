"use client";

import useQueryParams from '@/hooks/useQueryParams';
import { FC } from 'react'

type TRedirectWithQueryParam = {
  name: string;
  value: string | number;
}

const RedirectWithQueryParam: FC<TRedirectWithQueryParam> = ({ name, value }) => {
  const { redirectWithParam } = useQueryParams();

  return redirectWithParam(name, value);
}

export default RedirectWithQueryParam