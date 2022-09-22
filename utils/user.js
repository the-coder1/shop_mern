import useSWR from "swr"

export const useUser = () => {
  const { data, error } = useSWR('/api/user')

  return {
    user: data,
    loading: !error && !data,
    error: error
  }
}