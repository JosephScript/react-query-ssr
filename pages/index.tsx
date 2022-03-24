import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from './_app'
import { useMutation, useQuery, dehydrate, QueryClient } from 'react-query'

const queryClient = new QueryClient()

// Server side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = queryClient.
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Page: NextPageWithLayout = (/* pageProps */) => {
  return <></>
}

export default Page
