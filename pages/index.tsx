import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from './_app'
import { useQuery, dehydrate, QueryClient } from 'react-query'
// import 'node-fetch'

const fetchAPI = async <T,> (input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init)
  return await response.json()
}

const queryKey = ['hello']

// Server side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryKey, () => fetchAPI('http://localhost:3000/api/hello'))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Page: NextPageWithLayout = (/* pageProps */) => {
  const [name, setName] = useState<string>()

  useQuery(queryKey, () => fetchAPI<{ name: string }>('http://localhost:3000/api/hello'), {
    onSuccess: (data) => {
      if (data) {
        setName(data.name)
      } else {
        setName('Error no response!')
      }
    }
  })
  return <div>Hello {name ?? 'unknown.'}</div>
}

export default Page
