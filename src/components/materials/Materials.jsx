import { Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { styles } from "../helpers";
import { useLocation } from "react-router-dom";


const Materials = () => {
    const search = useLocation().search;
    const postBody = {
        keyWord: localStorage.getItem('cat')

    };

    const [items, setItems] = useState([]);
    const [marks, setMarks] = React.useState("");
    const sub_id = new URLSearchParams(search).get("sub");


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
        const atId = new URLSearchParams(search).get("attempt");
        axios.get('http://localhost:5000/api/getSum/' + atId).then((res) => {
            setMarks(res.data.data[0].marks);

            var category = localStorage.getItem('category')
            var findingWord = sub_id
            var myPattern = new RegExp('(\\w*' + findingWord + '\\w*)', 'gi');
           
            if (res.data.data[0].marks < 40) {
                console.log(marks)
                axios.post('http://127.0.0.1:8000/getResource3', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
                axios.post('http://127.0.0.1:8000/getResource2', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
                axios.post('http://127.0.0.1:8000/getResource1', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
            }
            else if (res.data.data[0].marks > 40 && res.data.data[0].marks < 70) {
                axios.post('http://127.0.0.1:8000/getResource3', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
                axios.post('http://127.0.0.1:8000/getResource2', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
            }
            else if (res.data.data[0].marks > 70 && res.data.data[0].marks < 100) {
                axios.post('http://127.0.0.1:8000/getResource3', { keyWord: findingWord }).then((data) => setItems(old => [...old, ...data.data]))
            }
        });
    }, []);
    return (

        <center><br /><br /> <div>
            <h3>You can study below resources to improve your skils</h3><br /><br /><br />
            {items.length > 0 && items.map((element, i) => (
                element.map((ele, i) => (
                    <a href={require('../../../src/pdf/' + ele.substring(0, ele.indexOf(' ')))} target="_blank">
                        <div key={i}>{ele}</div>
                    </a>
                ))

            ))}
            <br /><br /><br />
        </div></center>

    );

}

export default Materials;