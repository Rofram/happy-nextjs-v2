import { GetStaticProps } from "next";
import api from "../services/api";
import { OrphanageDetailsProps } from "../templates/OrphanageDetails";
import OrphanagesMap, { OrphanagesMapProps } from "../templates/OrphanagesMap";

export default function Map(props: OrphanagesMapProps) {
  return <OrphanagesMap {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<OrphanageDetailsProps[]>('/orphanages')

  const orphanages = data.map(orphanage => ({
    position: [orphanage.latitude, orphanage.longitude],
    popup: {
      title: orphanage.name,
      image: orphanage.images[0].url,
      buttonLink: `/orphanages/${orphanage.id}`,
    }
  }))

  return {
    props: {
      revalidate: 60 * 60,
      orphanages
    },
  };
}