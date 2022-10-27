import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from "axios";
import NewSubject from './NewSubject';

export default function MakeQuestion() {
    const [open, setOpen] =React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [subjects, setSub]= React.useState( []);
    const [question, setQuestion]= React.useState("");
    const [marks, setMarks]= React.useState(0);
    const [subject, setSubject]= React.useState("");

    useEffect(() => {
        getSubjects();
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

    function getSubjects(){
        axios.get('http://localhost:5000/api/subjects').then((res)=>{                        
            console.log('data', res.data.data);
            setSub(res.data.data); 
        });
    }

return (
    <div className="container" >
    <div className="row" style={{margin: "50px", width:"850px"}}>
    
    <div className="card col-8" >
       <div className="card-body" >
       <h5 className="card-title">Make Quize</h5>
        <div class="form-group">
            <label for="exampleFormControlInput1">Subject</label>
            <select class="form-control" value={subject} onChange={handleSlcChange} id="exampleFormControlSelect1">
            <option>Select Option</option>
            {subjects != null ? subjects.map (item => (
             <option value={item.id}>{item.subject} - {item.path}</option>
        )) : null}
            </select>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Question</label>
            <textarea class="form-control" onChange={(event) => setQuestion(event.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Marks</label>
            <input type="number" onChange={(event) => setMarks(event.target.value)} class="form-control" id="marks"/>
        </div>
        
        <button style={{marginTop: "10px"}} onClick={handleSubmit} class="btn btn-primary">Save</button>
        
        </div>
        </div>
    
    <NewSubject/>
    </div>
    </div>
)

}