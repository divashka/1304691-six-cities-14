import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { OfferPreview, Offer as OfferType } from '../../types/types';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { Location } from '../../types/types';
import { memo } from 'react';

const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

type MapProps = {
  block: string;
  offers: OfferPreview[];
  location: Location;
  offer?: OfferType | null;
  selectedPointId?: OfferType['id'] | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComponent({ block, offers, location, offer, selectedPointId }: MapProps): JSX.Element {

  const mapRef = useRef(null);

  const map = useMap({ mapRef, location });

  const selectedPoint = offers.find((item) => item.id === selectedPointId);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {

      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && item.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

      });

      if (offer) {
        const markerCurrent = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        markerCurrent
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint, offer]);

  return (
    <section className={`${block}__map map`}
      ref={mapRef}
      data-testid="mapContainer"
    >
    </section>
  );
}

const Map = memo(MapComponent);

export default Map;
