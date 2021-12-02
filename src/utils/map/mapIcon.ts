import Leaflet from 'leaflet';

const mapIcon = Leaflet.icon({
    iconUrl: '/images/local.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default mapIcon;