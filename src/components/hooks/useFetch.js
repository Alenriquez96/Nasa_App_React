import axios from "axios";
import {useState, useEffect} from "react";


// useFetch será una función que reciba como parámetro un string con una url
const useFetch = (url) => {
    // Crearemos dos estados: loading(true) y result([]), que devolveremos en un objeto
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState([])
    // Añadiremos un useEffect que se ejecutará cuando la url cambie y hará un fetch a dicha url
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url)
                // vamos a agregar un setTimeout a continuación del fetch para apreciar mejor el comportamiento del hook
                // Dentro del setTimeout actualizaremos los dos estados de este hook (loading y result)
                    setResult(response.data)
                    setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [url]);
    return { loading, result }
}
// Haremos un export default de la función para importarla como hook en el componente deseado
export default useFetch;