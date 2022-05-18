import React from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import logo1 from "../../../../assets/i1.png";
import logo2 from "../../../../assets/i2.png";
import logo3 from "../../../../assets/i3.png";
import logo4 from "../../../../assets/i4.png";
import logo5 from "../../../../assets/i5.png";
import logo6 from "../../../../assets/i6.png";
import logo7 from "../../../../assets/i7.png";
import {Link} from "react-router-dom";



const CardLanding = (props) => {
  const { register, handleSubmit } = useForm();
  const landings = props.data;

  const images = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];
  const shuffledImages = images.sort((a, b) => 0.5 - Math.random());

  

  const removeLanding = async () =>{
    try {
      const res = await axios.delete(`https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/delete/${landings.id}`);
      const data = await res.data;
      console.log(data);
      console.log(landings.id);
      props.remove();
    } catch (error) {
      console.log(error);
    }   
  }

  const updateLanding = async(newLanding)=>{
    try {
      const newLandingObj = {
        name: newLanding.name,
        id: newLanding.id,
        mass: newLanding.mass,
        recclass: newLanding.recclass,
        year: newLanding.year,
        reclat: newLanding.reclat,
        reclong: newLanding.reclong,
        geolocation: {
          latitude: newLanding.reclat,
          longitude: newLanding.reclong
        }
      };
      console.log(newLandingObj);
      const res = await axios.put(`https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/edit/${landings.id}`, newLandingObj);
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Card className="cards" sx={{ maxWidth: 345 }}>
      <Link to={`/landings/detail/${landings.id}`}>
        <CardContent>
          <Typography color="text.secondary">#{landings.id}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {landings.name}
          </Typography>
          <img src={shuffledImages[0]} alt="Asteroid icons" className="imgCard"/>
          <Typography variant="body2" color="text.secondary">
          Mass: {landings.mass}
          </Typography>
          <Typography>Class: {landings.recclass}</Typography>
          {landings.year?<Typography>Year: {landings.year.slice(0,9)}</Typography>:""}
          <Typography>Latitude: {landings.reclat}</Typography>
          <Typography>Longitude: {landings.reclong}</Typography>
        </CardContent>
      </Link>
      <CardContent>
      <Button size="small" onClick={removeLanding}>Delete</Button>
      

      <Popup className="cardPopup" trigger={<Button size="small">Update</Button>} position="bottom left">
        {close => (
          <div id="divPopup">
            <form onSubmit={handleSubmit(updateLanding)}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                <TextField {...register("name")}  label="Name" variant="outlined" name="name" required/>
                <TextField {...register("id")}  label="ID" variant="outlined" name="id" required/>
                <TextField {...register("recclass")}  label="Class" variant="outlined"  name="recclass" />
                <TextField {...register("year")} variant="outlined" type="date"  name="year" />
                <TextField {...register("mass")}  label="Weight" variant="outlined" name="mass"/>
                <TextField {...register("reclat")}  label="Latitude" variant="outlined" name="reclat" required/>
                <TextField {...register("reclong")}  label="Longitude" variant="outlined" name="reclong" required/>
                <Button size="small" type="submit">Update</Button>
                </CardContent>
              </Card>
            </form>
          </div>
        )}
        </Popup>
      </CardContent>
  </Card>
  )
}
export default CardLanding;
