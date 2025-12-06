import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { GeoPosition } from "./type";

// Define libraries outside component to prevent reloading
const libraries: ("places" | "marker")[] = ["places", "marker"];

const MapContainer = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });

  const AutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [position, setPosition] = useState<GeoPosition>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const MarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  // onplacechanged event handler
  const onPlaceChanged: () => void = () => {
    const place = AutocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      setPosition((prev) => ({
        ...prev,
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      }));
    }

    map?.panTo(place?.geometry?.location!);
    // map?.setZoom(15);
  };

  // useEffect
  useEffect(() => {
    if (map && window.google?.maps?.marker && !MarkerRef.current) {
      MarkerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: {
          lat: position.lat || 37.7749,
          lng: position.lng || -122.4194,
        },
      });
    } else if (MarkerRef.current) {
      MarkerRef.current.position = {
        lat: position.lat || 37.7749,
        lng: position.lng || -122.4194,
      };
    }
  }, [map, position]);
  return (
    <>
      {!isLoaded ? (
        <div>Loading Google Maps...</div>
      ) : (
        <div className="m-4 relative h-full flex flex-col">
          <h1 className="text-3xl font-semibold">Map</h1>
          <div className="my-4">
            <Autocomplete
              onLoad={(ref) => (AutocompleteRef.current = ref)}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search the places, you love..."
                className="w-full border border-blue-500 focus:ring-4 focus:ring-blue-200 px-4 py-2 rounded-xl outline-none transition-all duration-300 text-xl"
              />
            </Autocomplete>
          </div>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "80vh",
              borderRadius: "8px",
            }}
            onLoad={(mapInstance) => setMap(mapInstance)}
            center={{
              lat: position.lat || 37.7749,
              lng: position.lng || -122.4194,
            }}
            zoom={12}
            options={{
              mapId: "DEMO_MAP_ID", // Required for AdvancedMarkerElement
            }}
          />
        </div>
      )}
    </>
  );
};

export default MapContainer;
