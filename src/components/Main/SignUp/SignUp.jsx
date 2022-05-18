import React,{ useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';



const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailOk, setEmailOk] = useState(true);
  const [passOK, setPassOk] = useState(true);
  const [dataProvidedOk, setDataProvidedOk] = useState(true);
  const [samePass, setSamePass] = useState(true);

  const createUser = async(create) =>{
    try {
        setSamePass(true);
        setEmailOk(true);
        setPassOk(true);
        setDataProvidedOk(true);
        const res = await axios.post("https://nasa-app-node-react.herokuapp.com/api/astronomy/users/create", create)
        const data = res.data;
        if (data === "User created succesfully") {
          setIsRegistered(true);
        }        
    } catch (error) {
      if (error.response.data==='Passwords dont match') {
        setSamePass(false);
      } else if(error.response.data==="Email too weak"){
        setEmailOk(false);
      } else if(error.response.data==="Password too weak"){
        setPassOk(false);
      } else if(error.response.data==='Data not provided'){
        setDataProvidedOk(false);
      }
    }
  }

  return (
    <div className="idvLogin">
      <form onSubmit={handleSubmit(createUser)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent className="form">
            <TextField {...register("name")} name="name" type="text" label="User Name"/>
            <TextField {...register("email")} name="email" type="text" label="email"/>
            <TextField {...register("password")} name="password" type="password" label="Password"/>
            <TextField {...register("pass2")} name="pass2" type="password" label="Repeat Password" />
            <Button size="small" type="submit" value="Submit">Register</Button>
          </CardContent>
        </Card>
      </form>
      {isRegistered===true?
        <div>
          <Alert severity="success">User registered succesfully!</Alert>
          <Link to="/login"><Button>Go to login screen</Button></Link>
        </div>
        :""}
      {samePass===false? <Alert severity="error">Passwords dont match</Alert>:""}
      {emailOk===false?<Alert severity="error">Your email is not valid. </Alert>:""}
      {passOK===false?<Alert severity="error">Your password is not valid, it must be 8 characters long and contain lowerCase, upperCase, symbol and a number. </Alert>:""}
      {dataProvidedOk===false?<Alert severity="error">Data not provided, please complete all the fields. </Alert>:""}     
      <h3>Already registered? Go to login screen...</h3>
      <Button variant="outlined"><Link to="/login">Log In</Link></Button>
      <Button><a href="https://nasa-app-node-react.herokuapp.com/api/astronomy/auth/google"><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Login with google"/>Login with Google</a></Button>
     
    </div>
  )
};

export default SignUp;
