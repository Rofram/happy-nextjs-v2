export type ApiResponse = {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  open_hours: string
  open_on_weekends: boolean
  createdAt: string
  updatedAt: string
  Images: [
    {
      url: string
    }
  ]
}

export default function OrphanageDetails(props: ApiResponse) {
  return (
    <main>
      <h1>{props.name}</h1>
    </main>
  )
}