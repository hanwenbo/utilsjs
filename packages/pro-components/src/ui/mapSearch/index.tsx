import React, {useState, useEffect} from "react";
import './index.less';
import {message} from "antd";
import AutoComplete from "./auto-complete"
import {Map, Marker} from '@pansy/react-amap';

const defaultZoom = 5
type PositionType = {
  longitude: number
  latitude: number
}
type MapSearchProps = {
  address: string;
  longitude: number;
  latitude: number;
  onAddressChange: (address: string) => void;
  onPositionChange: (e: PositionType) => void;
}
const defaultPosition = {
  longitude: 31.695214,
  latitude: 107.113282
}

const MapSearch = ({
                     address = '',
                     longitude = defaultPosition.longitude,
                     latitude = defaultPosition.latitude,
                     onAddressChange = () => {
                     },
                     onPositionChange = () => {
                     },
                   }: MapSearchProps) => {

  const [zoom, setZoom] = useState(defaultZoom);
  const [addressName, setAddressName] = useState(address ?? '');
  const [markerPosition, setMarkerPosition] = useState({
    longitude: longitude ? longitude : defaultPosition.longitude,
    latitude: latitude ? latitude : defaultPosition.latitude
  });

  useEffect(() => {
    setAddressName(address)
    if (!!latitude || !!longitude) {
      setMarkerPosition({latitude, longitude})
    }
  }, [address, longitude, latitude]);


  const onAddressSelect = (item: AMap.AutoComplete.Tip) => {
    const {location: {lat, lng}, name} = item
    if (lat && lng) {
      onAddressChange(name)
      onPositionChange({longitude: lng, latitude: lat})
      setMarkerPosition({longitude: lng, latitude: lat})
      setAddressName(name)
      setZoom(defaultZoom)
    } else {
      message.error('请输入具体位置')
    }
  }
  return <div className={"map-search-main"}>
    <div className={"map-search-autoComplete"}>
      <AutoComplete
        value={addressName}
        onAddressSelect={onAddressSelect}
      />
    </div>
    <Map
      zoom={zoom}
      events={{
        click: ({type, ...e}) => {
          if (type === 'click') {
            setMarkerPosition({
              longitude: e.lnglat.getLng(),
              latitude: e.lnglat.getLat()
            })
            onPositionChange({
              longitude: e.lnglat.getLng(),
              latitude: e.lnglat.getLat()
            })
          }
        }
      }}
    >
      <div>
        <Marker
          position={{
            longitude: markerPosition.longitude,
            latitude: markerPosition.latitude
          }}
        />
      </div>
      <span
        className={"map-search-position"}>当前选择：{!!addressName ? addressName : "-"} 坐标：{markerPosition.longitude},{markerPosition.latitude}</span>
    </Map>
  </div>
}

export default MapSearch;
