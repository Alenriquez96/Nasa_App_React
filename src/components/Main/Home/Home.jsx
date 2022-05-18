import React from "react";
import useFetch from "../../hooks/useFetch";
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  // const {loading, result} = useFetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
  const {loading, result} = useFetch(`https://api.nasa.gov/planetary/apod?api_key=nDIbCiboUueGLK5yfznO8tviTyfZmXt3iBSoM2eN`)
  const apod = result;
  
  return (
    <div id="divHome">
      {loading?<div id="divSpinner"><CircularProgress /></div>: 
      <section>
        <h1>Welcome to the Nasa App!</h1>
        {apod.media_type === "video" ?
          <iframe
          width="853"
          height="480"
          src={apod.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        /> : <img className="imgHome" src={apod.hdurl} alt="APOD" />}
        <p>Today's astronomy picture of the day (Apod) is titled :</p>
        <h4>{apod.title}</h4>
        <p>It was taken in {apod.date}</p>
        <p>{apod.explanation}</p>
      </section>}
    </div>
  )
};

export default Home;
