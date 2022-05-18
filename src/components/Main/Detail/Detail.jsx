import React, {useState, useEffect} from "react";
import {useParams,Link} from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  
import L from "leaflet";





const Detail = () => {
  const { id } = useParams();
  const [landingById, setLandingById] = useState("")
  console.log(landingById);


  const asteroidIcon = new L.Icon({
    iconUrl: require('../../../assets/icon-azul.png'),
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40)
  });

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const value = await axios.get(`https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/${id}`);
        const data = await value.data;
        setLandingById(data);
      }catch(error){
        console.log(error);
      }
  }
  fetchData();
  }, [id]);

  


  if (landingById) {
  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
      <Typography color="text.secondary">#{landingById.id}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {landingById.name}
          </Typography>
          {/* <img src={shuffledImages[0]} alt="Asteroid icons" className="imgCard"/> */}
          <Typography variant="body2" color="text.secondary">
          Mass: {landingById.mass}
          </Typography>
          <Typography>Class: {landingById.recclass}</Typography>
          <Typography>Latitude: {landingById.reclat}</Typography>
          <Typography>Longitude: {landingById.reclong}</Typography>
          <MapContainer className="map" center={[landingById.geolocation.latitude, landingById.geolocation.longitude]} zoom={7} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/alenriquez96/cl31qm2sr002c14nuopvdpdg3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxlbnJpcXVlejk2IiwiYSI6ImNsMDByNzh2NDBiYjQza21venc3bDY5amgifQ.eSIELlDBGMpJS14wkKbqqA"
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker
                  position={[landingById.geolocation.latitude, landingById.geolocation.longitude]}
                  icon={asteroidIcon}
                >
                  <Popup>
                    {landingById.name}
                  </Popup>
                </Marker>
        </MapContainer>
        <Link to={`/landings/list`}>
          <Button variant="outlined">List</Button>
        </Link>
      </CardContent>
    </Card>
  )
}  
}

export default Detail;
