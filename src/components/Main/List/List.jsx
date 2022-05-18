import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import CardLanding from "./Card";
import usePagination from "../../hooks/usePagination";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';





const List = () => {
  const [AllLandings, setAllLandings] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setname] = useState("");
  const [landingByName, setlandingByName] = useState([]); 
  const PER_PAGE = 10;

  const count = Math.ceil(AllLandings.length / PER_PAGE);
  const _DATA = usePagination(AllLandings, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("https://nasa-app-node-react.herokuapp.com/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData;
          setAllLandings(dataSliced);
        }catch(error){
          console.log(error);
        }
    }
    fetchData();
  },[]);

  useEffect(() => {
    const fetchData = async () =>{
      const encodedName = encodeURIComponent(name);
      try {
        const res = await axios.get(`https://nasa-app-node-react.herokuapp.com/api/astronomy/landings/name/${encodedName}`);
        const data = res.data;
        setlandingByName(data)
      } catch (error) {
        console.log(error);
      }
    } 
    fetchData();
  }, [name])
  


  const handleSubmit = (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    setname(name);
    e.target.name.value="";
  }

  const handleClear = (e) =>{
    e.preventDefault();
    setlandingByName([]);
  }

  const removeLanding = (i) =>{
    const remainingLandings = AllLandings.filter((landing,j)=>i!==j)
    setAllLandings(remainingLandings);
  }

  function handleSortName() {
    const sortedData = [...AllLandings].sort((a,b)=>{
      return a.name > b.name ? 1: -1
    })
    setAllLandings(sortedData)
  }

  function handleSortYear() {
    const sortedData = [...AllLandings].sort((a,b)=>{
      return a.year > b.year ? 1: -1
    })
    setAllLandings(sortedData)
  }

  function handleSortMass() {
    const sortedData = [...AllLandings].sort((a,b)=>{
      return a.mass > b.mass ? 1: -1
    })
    setAllLandings(sortedData)
  }

  if (AllLandings) {
  return (
    <div>
      <div className="divBotones">
        <div className="botones">
          <Button onClick={handleSortName} variant="outlined">Sort by name</Button>
          <Button onClick={handleSortYear} variant="outlined">Sort by year</Button>
          <Button onClick={handleSortMass} variant="outlined">Sort by weight</Button>
        </div>
        {!landingByName?
        <form onSubmit={handleSubmit}>
          <TextField name="name" id="outlined-basic" label="Search by name..." variant="outlined" />
          <Button type="submit" variant="contained">Search</Button>
        </form>:
        <form onSubmit={handleSubmit}>
          <TextField name="name" id="outlined-basic" label="Search..." variant="outlined" />
          <Button type="submit" variant="contained">Search</Button>
          <Button onClick={handleClear} variant="contained">Full list</Button>
        </form>
        }
        
      </div>

      <section>
        {landingByName?landingByName.map((landings,i) =><CardLanding key={i} data={landings} remove={()=>removeLanding(i)}/>):
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
            { _DATA.currentData().map((landings,i) =><CardLanding key={i} data={landings} remove={()=>removeLanding(i)}/>)  }  
        </section>
        }
    </section>
    </div>
  )
}
}

export default List;
