import React,{ useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {Link} from "react-router-dom";
import axios from 'axios';
import 'leaflet/dist/leaflet.css';  
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const Landings = () => {
  const [defaultLandings, setDefaultLandings] = useState(null);
  const [landings, setLandings] = useState(null);
  const [select, setSelect] = useState(null);
  const [option, setOption] =useState(null);

  // console.log(defaultLandings);
  // console.log(landings);

  const asteroidIcon = new L.Icon({
    iconUrl: require('../../../assets/icon-azul.png'),
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40)
  });

  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("https://nasa-app-node-react.herokuapp.com/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData.slice(0,300);
          setDefaultLandings(dataSliced);
        }catch(error){
          console.log(error);
        }
    }
    fetchData();
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get(`https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/${select}/${option}`)
        const data =  await res.data;
        setLandings(data)
  
      } catch (error) {
        console.log(error);
      }
    } 
    fetchData();
  }, [select,option])
  
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const select = e.target.by.value;
    const option = e.target.option.value;
    const capitalizedOption = option.toUpperCase();
    setOption(capitalizedOption);
    setSelect(select);

    e.target.option.value="";

  }

  let navigate = useNavigate();
  const handleClick = () =>{
    let path = `list`; 
    navigate(path);
  }
  
  const routeChange = () =>{ 
    let path = `create`; 
    navigate(path);
  }

    
  if (landings) {
  return (
    <div className="divLanding">
      <div className="divBar">
        <div>
          <h5>Search landings by class or weight!</h5>
          <form onSubmit={handleSubmit} className="formLanding">
            <Select name="by">
                <MenuItem value="mass">Weight</MenuItem>
                <MenuItem value="class">Class</MenuItem>
            </Select>
            <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
            <Button variant="outlined" type="submit">Submit</Button>
          </form>
        </div>
        <div>
          <h5>You can check the full list of landings here...</h5>
          <Button variant="outlined" onClick={handleClick}>List</Button>
        </div>
      </div>
      <MapContainer center={[31.505, -0.09]} zoom={3} scrollWheelZoom={true}>
        {/* Pegar esto siempre en la url de TileLayer para personalizar la capa del mapa --->https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/256/{z}/{x}/{y}@2x?access_token={access_token} */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/alenriquez96/cl31qm2sr002c14nuopvdpdg3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxlbnJpcXVlejk2IiwiYSI6ImNsMDByNzh2NDBiYjQza21venc3bDY5amgifQ.eSIELlDBGMpJS14wkKbqqA"
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landings.map((data, i) =>
          data.geolocation && data.reclat &&data.reclong ? (
            <Marker
              key={i}
              position={[data.geolocation.latitude, data.geolocation.longitude]}
              icon={asteroidIcon}
            >
              <Popup>Asteroid details:
                <ul>
                  <li>Name: {data.name}</li>
                  <li>ID: {data.id}</li>
                  <li>Class: {data.recclass}</li>
                  <li>Mass(weight): {data.mass}</li>
                  <li>State: {data.fall}</li>
                  <li>Year: {data.year}</li>
                  <li>Latitude: {data.reclat}</li>
                  <li>Longitude: {data.reclong}</li>
                </ul>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
      <div className="divRouteChange">
        <h4>Or create your own landing!</h4>
        <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
      </div>
    </div>
  );
}
else if (defaultLandings) {
  return (
    <div className="divLanding">
        <div className="divBar">
          <div>
            <h5>Search landings by class or weight!</h5>
            <form onSubmit={handleSubmit} className="formLanding">
              <Select name="by">
                  <MenuItem value="mass">Weight</MenuItem>
                  <MenuItem value="class">Class</MenuItem>
              </Select>
              <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
              <Button variant="outlined" type="submit">Submit</Button>
            </form>
          </div>
          <div>
            <h5>You can check the full list of landings here...</h5>
            <Button variant="outlined" onClick={handleClick}>List</Button>
          </div>
        </div>
        <MapContainer center={[31.505, -0.09]} zoom={3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/alenriquez96/cl31qm2sr002c14nuopvdpdg3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxlbnJpcXVlejk2IiwiYSI6ImNsMDByNzh2NDBiYjQza21venc3bDY5amgifQ.eSIELlDBGMpJS14wkKbqqA"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {defaultLandings.map((data, i) =>
            data.geolocation && data.reclat &&data.reclong ? (
              <Marker
                key={i}
                position={[data.geolocation.latitude, data.geolocation.longitude]}
                icon={asteroidIcon}
              >
                <Popup>Asteroid details:
                  <ul>
                    <li>Name: {data.name}</li>
                    <li>ID: {data.id}</li>
                    <li>Class: {data.recclass}</li>
                    <li>Mass(weight): {data.mass}</li>
                    <li>State: {data.fall}</li>
                    <li>Year: {data.year}</li>
                    <li>Latitude: {data.reclat}</li>
                    <li>Longitude: {data.reclong || ""}</li>
                    <Link to={`/landings/detail/${data.id}`}>See more Details</Link>
                  </ul>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
        <div className="divRouteChange">
          <h4>Or create your own landing!</h4>
          <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
        </div>
    </div>
  );
}
else{
  return (
    <div className="divLanding">
      <div className="divBar">
        <div>
          <h5>Search landings by class or weight!</h5>
          <form onSubmit={handleSubmit} className="formLanding">
            <Select name="by">
                <MenuItem value="mass">Weight</MenuItem>
                <MenuItem value="class">Class</MenuItem>
            </Select>
            <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
            <Button variant="outlined" type="submit">Submit</Button>
          </form>
        </div>
        <div>
          <h5>You can check the full list of landings here...</h5>
          <Button variant="outlined" onClick={handleClick}>List</Button>
        </div>
      </div>
    </div>
  )
}
}

export default Landings;
