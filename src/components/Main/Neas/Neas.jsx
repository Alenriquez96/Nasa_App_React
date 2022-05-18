import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import usePagination from "../../hooks/usePagination";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';


const Neas = () => {
  const [neas, setNeas] = useState([]);
  const [page, setPage] = useState(1);
  const [designation, setdesignation] = useState("");
  const [neasByDesignation, setneasByDesignation] = useState([]);
  const PER_PAGE = 10;

  const count = Math.ceil(neas.length / PER_PAGE);
  const _DATA = usePagination(neas, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  console.log(neasByDesignation);

  useEffect(() => {
    const fetchData = async() =>{
    try{
      const res = await axios.get("https://nasa-app-node-react.herokuapp.com/api/astronomy/neas");
      const data = res.data;
      setNeas(data);
    }
    catch(error){
      console.log(error);
    }
  }
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () =>{
      const encodedDesignation = encodeURIComponent(designation);
      try {
        const res = await axios.get(`https://nasa-app-node-react.herokuapp.com/api/astronomy/neas/designation/${encodedDesignation}`);
        const data = res.data;
        setneasByDesignation(data);
      } catch (error) {
        console.log(error);
      }
    } 
    fetchData();
  }, [designation])

  const handleSubmit = (e) =>{
    e.preventDefault();
    const des = e.target.designation.value;
    setdesignation(des);
    e.target.designation.value="";
  }

  const handleClear = (e) =>{
    e.preventDefault();
    setneasByDesignation([]);
  }

  const removeNea = (i) =>{
    const remainingNeas = neas.filter((landing,j)=>i!==j)
    setNeas(remainingNeas);
  }
      

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `create`; 
    navigate(path);
  }

  function handleSortDesig() {
    const sortedData = [...neas].sort((a,b)=>{
      return a.designation > b.designation ? 1: -1
    })
    setNeas(sortedData)
  }

  function handleSortYear() {
    const sortedData = [...neas].sort((a,b)=>{
      return a.discovery_date > b.discovery_date ? 1: -1
    })
    setNeas(sortedData)
  }

  function handleOrbit() {
    const sortedData = [...neas].sort((a,b)=>{
      return a.orbit_class > b.orbit_class ? 1: -1
    })
    setNeas(sortedData)
  }
  
  if(neas){
  return (
    <div>
      <h3>What is a NEA?</h3>
      <p>A near-Earth asteroid (NEA) is any small Solar System body whose orbit brings it into proximity with Earth. By convention, a Solar System body is a NEA if its closest approach to the Sun (perihelion) is less than 1.3 astronomical units (AU).</p>
      <p>Here you can see all NEAS registered...</p>
      <div className="divBotones">
        <div className="botones">
            <Button onClick={handleSortDesig} variant="outlined">Sort by designation</Button>
            <Button onClick={handleSortYear} variant="outlined">Sort by discovery date</Button>
            <Button onClick={handleOrbit} variant="outlined">Sort by orbit class</Button>
        </div>
        {!neasByDesignation?
        <form onSubmit={handleSubmit}>
          <TextField name="designation" id="outlined-basic" label="Search by designation..." variant="outlined" />
          <Button type="submit" variant="contained">Search</Button>
        </form>   
        :
        <form onSubmit={handleSubmit}>
          <TextField name="name" id="outlined-basic" label="Search..." variant="outlined" />
          <Button type="submit" variant="contained">Search</Button>
          <Button onClick={handleClear} variant="contained">Full list</Button>
        </form>}
      </div>
    <section>
      {neasByDesignation?neasByDesignation.map((nea, i)=><Card key={i} data={nea} remove={()=>removeNea(i)}/>)
      :
      <section>
        <Pagination
            count={count}
            size="large"
            color="primary"
            page={page}
            variant="outlined"
            onChange={handleChange}
            className="muiPag"
          />
        <div id="neas">
        {_DATA.currentData().map((nea, i)=><Card key={i} data={nea} 
        remove={()=>removeNea(i)}
        />)
        }
        </div>
        <div className="routeChangeNea">
          <h4>Or create your own NEA!</h4>
          <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
        </div>
      </section>}
    </section>
    </div>
  )
}
}

export default Neas;
