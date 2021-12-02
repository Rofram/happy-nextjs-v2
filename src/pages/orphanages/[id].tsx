import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"

import OrphanageDetails, { ApiResponse } from "../../templates/OrphanageDetails"

export default function OrphanageDetailsPage(props: ApiResponse) {
  return <OrphanageDetails {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<ApiResponse[]>(`${process.env.API_URL}/orphanages`)

  const paths = data.map(orphanage => ({
    params: { id: orphanage.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get<ApiResponse>(`${process.env.API_URL}/orphanages/${params?.id}`)

  return {
    props: data,
  }
}