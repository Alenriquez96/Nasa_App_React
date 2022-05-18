import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import nea1 from "../../../../assets/nea1.png";
import nea2 from "../../../../assets/nea2.png";
import nea3 from "../../../../assets/nea3.png";
import {Link} from "react-router-dom";



const CardNeas = (props) => {
  const neas = props.data;
  const { register, handleSubmit } = useForm();


  
  const images = [nea1,nea2,nea3];
  const shuffledImages = images.sort((a, b) => 0.5 - Math.random());

  const removeNea = async () =>{
    const encodedNea = encodeURIComponent(neas.designation);
    console.log(encodedNea);
    try {
      const res = await axios.delete(`https://nasa-app-node-react.herokuapp.com/api/astronomy/neas/delete/${encodedNea}`);
      const data = await res.data;
      console.log(data);
      props.remove();     
    } catch (error) {
      console.log(error);
    }   
  }

  

  const updateNea = async(newNea)=>{
    try {
      const newNeaObj = {
        designation: newNea.designation,
        discovery_date: newNea.discovery_date,
        period_yr: newNea.period_yr,
        orbit_class: newNea.orbit_class
      };
      console.log(newNeaObj);
      const encodedNea = encodeURIComponent(neas.designation);
      console.log(encodedNea);
      const res = await axios.put(`https://nasa-app-node-react.herokuapp.com/api/astronomy/neas/edit/${encodedNea}`, newNeaObj);
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Card className="cards" sx={{ maxWidth: 345 }}>
      <Link to={`/neas/detail/${neas._id}`}>
        <CardContent>
          <Typography>{neas.orbit_class}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {neas.designation}
          </Typography>
          <img src={shuffledImages[0]} alt="neas icon"/>
          <Typography variant="body2" color="text.secondary">
          Discovery date: {neas.discovery_date.slice(0,9)}
          </Typography>
          <Typography>Orbital period: {neas.period_yr}</Typography>
        </CardContent>
      </Link>
      <CardContent>
       <Button size="small" onClick={removeNea}>Delete</Button>
       <Popup className="cardPopup" trigger={<Button size="small">Update</Button>} position="top left">
        {close => (
          <div >
            <form onSubmit={handleSubmit(updateNea)}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <TextField {...register("designation")}  label="Desgination" variant="outlined" name="designation" required/>
                  <TextField {...register("discovery_date")}  
                  // label="Discovery Date" 
                  type="date" variant="outlined" name="discovery_date" required/>
                  <TextField {...register("period_yr")}  label="Orbit period" variant="outlined"  name="period_yr"/>
                  <TextField {...register("orbit_class")}  label="Orbit class" variant="outlined" name="orbit_class" required/>
                  <Button size="small" type="submit">Update</Button>
                </CardContent>
              </Card>
            </form>
            <a className="close" onClick={close}>
              &times;
            </a>
          </div>
        )}
        </Popup>
      </CardContent>
    </Card>
  );
};

export default CardNeas;
