import React,{ useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// import Cookies from 'universal-cookie';
import { userContext } from "../../../context/userContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const {login} = useContext(userContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isNotLogged, setisNotLogged] = useState(false);
  // const cookies = new Cookies();

  const loginUser = async(log)=>{
    const res = await axios.post("https://nasa-app-node-react.herokuapp.com/api/astronomy/users/login",log);
    const data = res.data;
    console.log(data);
    if (data.message==="Correct credentials") {
      setIsLogged(true);
      setisNotLogged(false);
      login(log.email);

      // cookies.set("access-token",data.message2);
    } else{
      setisNotLogged(true)
    }
  }

  return (
    <div className="idvLogin">
      <form onSubmit={handleSubmit(loginUser)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent className="form">
            <TextField {...register("email")} name="email" type="text" label="email"/>
            <TextField {...register("password")} name="password" type="password" label="Password"/>
            <Button size="small" type="submit" value="Submit">Login</Button>
          </CardContent>
        </Card>
      </form>
      <Button><a href="https://nasa-app-node-react.herokuapp.com/api/astronomy/auth/google"><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Login with google"/>Login with Google</a></Button>
      {isLogged===true?
        <div>
          <Alert severity="success">User logged succesfully!</Alert>
          <Link to="/"><Button>Go to home screen</Button></Link>
        </div>
        :""}
      {isNotLogged===true?<Alert severity="error">Incorrect credentials</Alert>:""}
    </div>
  )
};

export default Login;
