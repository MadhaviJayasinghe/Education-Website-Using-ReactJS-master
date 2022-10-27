import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from "axios";

export default function NewSubject() {
    const [open, setOpen] =React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    
    const [path, setPath]= React.useState("");
    const [subject, setSubject]= React.useState("");

    useEffect(() => {
        
    },[]);


    const handleSubmit = () => {
        const quest = {subject:subject, path: path};
        axios.post('http://localhost:5000/api/newSubject', quest).then((res)=>{                        
            alert("Subject Added Successfully!");
        });
    }

    function getSubjects(){
        axios.get('http://localhost:5000/api/subjects').then((res)=>{                        
             
        });
    }

return (
    
    <div className="card col" style={{marginLeft: "10px"}}>
       <div class="card-body">
       <h5 class="card-title">New Subject</h5>
        
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Subject</label>
            <input type="text" onChange={(event) => setSubject(event.target.value)} class="form-control" id="marks"/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Sub Topic</label>
            <input type="text" onChange={(event) => setPath(event.target.value)} class="form-control" id="marks"/>
        </div>
        <button style={{marginTop: "10px"}} onClick={handleSubmit} class="btn btn-primary">Save</button>
        
        </div>
        </div>
    
)

}