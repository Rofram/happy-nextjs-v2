import { useMapEvents } from "react-leaflet";

export function handleMapClick() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}