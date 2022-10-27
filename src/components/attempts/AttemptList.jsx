import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from "axios";

export default function MakeQuestion() {
    const [open, setOpen] =React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [attms, setAttms]= React.useState( []);
    const [question, setQuestion]= React.useState("");
    const [marks, setMarks]= React.useState(0);
    const [subject, setSubject]= React.useState("");

    useEffect(() => {
        getAttempts();

    },[]);

    const handleSlcChange = (e) =>{
        setSubject(e.target.value);     
    }

    const handleSubmit = () => {
        const quest = {subject:subject, question:question , marks: marks};
        axios.post('http://localhost:5000/api/newQuestion', quest).then((res)=>{                        
            alert("Quize Added Successfully!");
        });
    }

    function getAttempts(){
        axios.get('http://localhost:5000/api/getAllAttempts').then((res)=>{    
            setAttms(res.data.data); 
        });
    }

return (
    <div className="container" >
    <div className="row" style={{margin: "50px", width:"850px"}}>
    
    <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Student</th>
            <th scope="col">Date</th>
            <th scope="col">Subject</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
        {attms != null ? attms.map ((item,index) => (
             <tr>
             <th scope="row">{index+1}</th>
             <td>{item.student}</td>
             <td>{item.date}</td>
             <td>{item.sub}</td>
             <td><a href={`/attempt?std=${item.student}&sub=${item.subject}&atm=${item.attemptid}&usr=tutor&isStudent=0`}>Review Attempt</a></td>
             </tr>
        )) : null}
          
        </tbody>
    </table>
    </div>
    </div>
)

}