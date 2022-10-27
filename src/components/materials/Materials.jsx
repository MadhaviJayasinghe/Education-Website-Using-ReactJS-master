import { Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { styles } from "../helpers";


const Materials = () =>{
    const postBody = {
        keyWord: localStorage.getItem('cat')

    };

      

    const[items, setItems] = useState([]);

    useEffect(() => {
        console.log('items', items)
    }, [items])
    const requestMetadata = {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: (postBody)

    };
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/getResource', {keyWord : localStorage.getItem('category')}).then((data) => setItems(data.data))
        //fetch('http://127.0.0.1:8000/getResource', requestMetadata).then((data) => console.log('dat', data));
    },[]);
    return(
      
     <center><br/><br/> <div>
        <h3>You can study below resources to improve your skils</h3><br/><br/><br/>
            {items.length > 0 && items.map((element, i ) => (
                element.map((ele, i) => (
                    <div key={i}>{ele}</div>
                ))
                
            ) )}
            <br/><br/><br/>
        </div></center>
        
    );

}

export default Materials;