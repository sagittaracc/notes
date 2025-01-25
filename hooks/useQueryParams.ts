import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParams = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const createUrlWithParam = (name: string, value: string | number) => {
    return pathname + '?' + createQueryString(name, String(value))
  }

  const redirectWithParam = (name: string, value: string | number) => {
    redirect(createUrlWithParam(name, value))
  }

  return {
    createQueryString,
    createUrlWithParam,
    redirectWithParam,
  }
}

export default useQueryParams;