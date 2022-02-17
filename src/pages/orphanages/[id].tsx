import { GetStaticPaths, GetStaticProps } from "next"
import api from "../../services/api"

import OrphanageDetailsTemplate, { OrphanageDetailsProps } from "../../templates/OrphanageDetails"

export default function OrphanageDetailsPage(props: OrphanageDetailsProps) {
  return <OrphanageDetailsTemplate {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<OrphanageDetailsProps[]>('/orphanages')

  const paths = data.map(orphanage => ({
    params: { id: orphanage.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await api.get<OrphanageDetailsProps>(`/orphanages/${params?.id}`)

  return {
    props: data,
  }
}