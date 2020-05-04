import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSort } from "../../redux/actions/setActions";
import GoogleMapReact from 'google-map-react';



export default function Map() {
  const [position, setPosition] = React.useState({});
  // const [tempPosition, setTempPosition] = React.useState({x:39.775571,y:-86.173558});
  const [error, setError] = React.useState(null);
  const [center, setCenter] = React.useState([39.7741143, -86.1761807]);
  const sort = useSelector(state => state.sort);
  const realUser = useSelector(state => state.realUser);
  const garages = useSelector(state => state.garages);
  const dispatch = useDispatch();
  const [collectionItems, setCollectionItems] = React.useState(garages);

  const onChange = ({ coords }) => {
    setPosition({
      x: coords.latitude,
      y: coords.longitude
    });
  };

  const onError = ((error) => {
    setError(error.message)
  });

  React.useEffect(() => {
    let sortedList = garages;
    for (let i in sort) {
      if (sort[i].toggle) {
        if (i === "check") {
          sortedList = sortedList.filter((item) => {
            let ret = false;
            if (item.isNearETOrIT) {
              ret = true;
            }
            return ret;
          });
        }
      }
    }
    setCollectionItems(sortedList);
  }, [sort, garages]);

  React.useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Hey, this isn't working!");
      return;
    }
    let watcher = geo.watchPosition(onChange, onError, { enableHighAccuracy: true });
    return () => geo.clearWatch(watcher);
  }, [position]);

  const renderInfo = collectionItems.map((d, idx) =>
    <h3 key={idx}
      style={
        {
          display: position.x >= d.hitbox.x2 && position.x <= d.hitbox.x1 &&
            position.y >= d.hitbox.y1 && position.y <= d.hitbox.y2 ? 'block' : 'none'
        }}
    >{position.x >= d.hitbox.x2 && position.x <= d.hitbox.x1 &&
      position.y >= d.hitbox.y1 && position.y <= d.hitbox.y2 ? `You are near the ${d.name}` : ""}
    </h3>
  );

  const renderMarkers = collectionItems.map((d, idx) =>
    <div className="circle" style={
      {
        backgroundColor: position.x >= d.hitbox.x2 && position.x <= d.hitbox.x1 &&
          position.y >= d.hitbox.y1 && position.y <= d.hitbox.y2 ? 'green' : 'red',
        height: '15px', width: '15px', borderRadius: '15px'
      }} key={idx} lat={d.latitude} lng={d.longitude} />
  );

  return (
    <div>
      <h1>Hello, {realUser.name}!</h1>
      <p>Latitude: {position.x}&#176;</p>
      <p>Longitude: {position.y}&#176;</p>
      <div style={{ height: '600px', width: 'auto', margin: 'auto', marginLeft: '25px', marginRight: '25px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDr-7s3eGcpdT_keRKxHfJmQnJCj0Ia6jw" }}
          center={center}
          defaultZoom={18}
          distanceToMouse={() => { }}
        >
          <div className="circle" style={{ backgroundColor: 'purple', height: '15px', width: '15px', borderRadius: '15px' }} lat={position.x} lng={position.y} />
          {renderMarkers}
        </GoogleMapReact>
      </div>
      {renderInfo}
      <button className="button" onClick={() => dispatch(changeSort("check", "isNearETOrIT: true"))} >Garages Near the ET & IT Buildings</button><br /><br />
      <div className="buttons" >
        {collectionItems.map((c, idx) => <button className="button" key={idx} onClick={() => setCenter([c.latitude, c.longitude])}>{c.name}</button>)}
      </div><br />
      <button className="button" style={{ marginRight: '10px' }} onClick={(() => setCenter([position.x, position.y]))}>You</button>
      <button className="button" style={{ marginLeft: '10px' }} onClick={() => setCenter([39.7741143, -86.1761807])}>Reset</button>
    </div>
  );
}