import React, { useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Alert from '@mui/material/Alert';



const Form = () => {
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [newLanding, setNewLanding] = useState("");


  const newRegistry = async(newLanding) =>{
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
    }

    console.log(newLandingObj);

    const res = await axios.post("https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/create",newLandingObj);
    const data = res.data;
    console.log(data);
    if (data === "Landing created") {
      setIsRegistered(true);
      setNewLanding(newLandingObj);
    }
  }
  
  return (
    <div>
      <h2>Create your own landing!</h2>
      <form onSubmit={handleSubmit(newRegistry)}>
        {/* Para usar register de react hook form hay que llamar igual al name del input y a lo que le pasas por register */}
        <Card sx={{ maxWidth: 345 }}>
          <CardContent className="form">
            <TextField {...register("name")}  label="Name" variant="outlined" name="name" required/>
            <TextField {...register("id")}  label="ID" variant="outlined" name="id" required/>
            <TextField {...register("recclass")}  label="Class" variant="outlined"  name="recclass" required/>
            <TextField {...register("year")} variant="outlined" type="date"  name="year" required/>
            <TextField {...register("mass")}  label="Weight" variant="outlined" name="mass" required/>
            <TextField {...register("reclat")}  label="Latitude" variant="outlined" name="reclat" required/>
            <TextField {...register("reclong")}  label="Longitude" variant="outlined" name="reclong" required/>
            <Button size="small" type="submit">Submit</Button>
          </CardContent>
        </Card>
      </form>
      {isRegistered===true?
      <div>
        <Alert severity="success">Landing Created succesfully!</Alert>
        <Link to={`/landings/detail/${newLanding.id}`}>See details</Link>
      </div>
      :""}
    </div>
  )
};

export default Form;
