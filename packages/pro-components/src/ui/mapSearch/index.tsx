import React, {useState, useEffect} from "react";
import styles from './index.less';
import {Map, Marker} from "react-amap";
import {message} from "antd";

const MapSearch = ({
                     address = '',
                     longitude = null,
                     latitude = null,
                     onAddressChange = (address) => {
                     },
                     onPositionChange = ({latitude, longitude}) => {
                     },

                   }) => {

  const [addressName, setAddressName] = useState(address ?? '');
  const [markerPosition, setMarkerPosition] = useState({
    longitude: longitude ? longitude : 120,
    latitude: latitude ? latitude : 35
  });

  useEffect(() => {
    setAddressName(address)
    if(!!latitude || !!longitude){
      setMarkerPosition({latitude, longitude})
    }
  }, [address,longitude,latitude]);


  // 设置坐标点，就会在地图上显示一个 标记点
  //     adcode
  //     adcode: "650103"
  //     address: "吐鲁番路66号(近阿勒泰办事处)"
  //     city: []
  //     district: "新疆维吾尔自治区乌鲁木齐市沙依巴克区"
  //     id: "B0FFF6AS6S"
  //     location: c {P: 43.782304, Q: 87.60411399999998, lng: 87.604114, lat: 43.782304}
  // name: "啊臻味道米粉(总店)"
  // typecode: "050121"


  // 高德地图 Marker 实例
  let markerInstance = undefined
  // 高德地图 Map 实例
  let mapInstance = undefined

  let amapEvents = {
    created: ins => {
      mapInstance = ins
      mapInstance.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.CitySearch'], () => {
        // 实例化Autocomplete
        const autoOptions = {
          // city 限定城市，默认全国
          // city: '025',
          // input 为绑定输入提示功能的input的DOM ID
          input: 'amapInput',
        }
        const autoComplete = new window.AMap.Autocomplete(autoOptions);
        // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
        const placeSearch = new window.AMap.PlaceSearch({
          // city: '南京',
          map: ins,
        })
        // 监听下拉框选中事件
        window.AMap.event.addListener(autoComplete, 'select', e => {
          const {location: {lat, lng}, name, adcode} = e.poi || {}
          if (lat && lng) {
            onAddressChange(name)
            onPositionChange({longitude: lng, latitude: lat})

            setMarkerPosition({longitude: lng, latitude: lat})
            setAddressName(name)
            // 需要在设置坐标成功后，重新设置 缩放级别
            mapInstance && mapInstance?.setZoom(15)
          } else {
            message.info('请输入具体位置')
          }
        })
      })
      // 实例点击事件
      mapInstance.on('click', e => {
        const lngLat = `${e.lnglat.getLat()},${e.lnglat.getLng()}`
        console.log('坐标位置:', e, lngLat)
        // this.props.onChange(lngLat)
        setMarkerPosition({
          longitude: e.lnglat.getLng(),
          latitude: e.lnglat.getLat()
        })
        onPositionChange({
          longitude: e.lnglat.getLng(),
          latitude: e.lnglat.getLat()
        })
        // 需要在设置坐标成功后，重新设置 缩放级别
        if (mapInstance) {
          mapInstance?.setZoom(15)
        }
      });
    },
  };
  let markerEvents = {
    created: ins => {
      console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
      console.log(ins.getPosition());

      markerInstance = ins
    },
    click: (e) => {
      console.log("你点击了这个图标；调用参数为：");
      console.log(e);
    },
  }

  return (
    <div>
      <div style={{width: '100%', height: '400px', position: 'relative'}}>
        {/* zoom={15} 设置后，无效，不知道什么原因，必须手动设置 */}
        <Map plugins={['ToolBar']} events={amapEvents} amapkey={'e8fc3dbb0daa0d1f7eef0df6919d3e60'}
             center={markerPosition}
        >
          <Marker position={markerPosition} events={markerEvents} draggable={true}>
            {/*<div className={styles.point}>这儿</div>*/}
          </Marker>
        </Map>
        {
          <div className={styles.infoBox}>
            <span className={styles.inputText}>请输地址</span>
            <input
              id="amapInput"
              className={styles.input}
              type="text"
              placeholder={'请输入'}
              defaultValue={addressName}
              onChange={(e)=>{
                onAddressChange(e?.target?.value)
              }}
            />
            {/*<span>当前选择：{addressName}，坐标：{longitude},{latitude}</span>*/}
          </div>
        }
      </div>
    </div>
  );
}

export default MapSearch;
