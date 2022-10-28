import { Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { styles } from "../helpers";


const Materials = () => {
    const postBody = {
        keyWord: localStorage.getItem('cat')

    };

    const [items, setItems] = useState([]);

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
        var category = localStorage.getItem('category')
        var findingWord = 'oop'
        var myPattern = new RegExp('(\\w*' + findingWord + '\\w*)', 'gi');

        var matches = category.match(myPattern);

        if (matches === null) {
            console.log("No results"); // Any message or empty
            return;
        }
        else {
            axios.post('http://127.0.0.1:8000/getResource', { keyWord: 'oop ' }).then((data) => setItems(old => [...old, ...data.data]))
            axios.post('http://127.0.0.1:8000/getResource', { keyWord: 'Object Oriented Programming' }).then((data) => setItems(old => [...old, ...data.data]))
            axios.post('http://127.0.0.1:8000/getResource', { keyWord: 'Object-Oriented Programming' }).then((data) => setItems(old => [...old, ...data.data]))
        }

        // axios.post('http://127.0.0.1:8000/getResource', {keyWord : localStorage.getItem('category')}).then((data) => setItems(data.data))
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