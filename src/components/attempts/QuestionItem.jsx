import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from "axios";

export default function QuestionItem(props) {
    const [open, setOpen] =React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [attms, setAttms]= React.useState( []);

    const [answer, setQuestion]= React.useState(props.answer);
    const [marks, setMarks]= React.useState(props.marks);
    const [subject, setSubject]= React.useState("");

    useEffect(() => {
        //getAttempts();
    },[]);

    const handleSlcChange = (e) =>{
        setSubject(e.target.value);     
    }

    const handleMarksSubmit = () => {
        // function handleMarksSubmit () {

        console.log('>>>>>>>>>>>hi', props.id);
        const quest = { marks: marks};
        axios.put('http://localhost:5000/api/updateMarksInAttempt/'+props.attemptid+'/'+props.id, quest).then((res)=>{                        
            alert("Review Added Successfully!");
        });
    }

    

    const handleAnswerSubmit = () => {
        const quest = {quest:props.qid, answer:answer , attempt: props.attemptid, marks:0};
        axios.post('http://localhost:5000/api/newQuestAttempt', quest).then((res)=>{                        
            alert("Attempt Saved Successfully!");
        });
    }

    function getAttempts(){
        axios.get('http://localhost:5000/api/getAllAttempts').then((res)=>{                        
            // console.log('data', res.data.data);
            setAttms(res.data.data); 
        });
    }

return (
    
    
    <div className="card col-10" style={{marginTop:"30px"}} >
       <div className="card-body" >
       <h5 className="card-title">Question {props.id}</h5>
        
        <div class="form-group">
            <label for="exampleFormControlTextarea1">{props.quest}</label>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Answer :</label>
            {props.tutor || props.reviewd ? 
            <textarea class="form-control" value={props.ans} onChange={(event) => setQuestion(event.target.value)} id="exampleFormControlTextarea1" rows="3" disabled></textarea> :
            <textarea class="form-control" onChange={(event) => setQuestion(event.target.value)} id="exampleFormControlTextarea1" rows="3" ></textarea>
            }
        </div>
        {props.tutor ?
        <>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Marks</label>
            <input type="number" value={marks} onChange={(event) => setMarks(event.target.value)} class="form-control" id="marks"/>
        </div>
        <button style={{marginTop: "10px"}} onClick={handleMarksSubmit} class="btn btn-primary">Save Review</button>
        </>
        :
        <div class="form-group">
            {props.reviewd ?
            <><label for="exampleFormControlTextarea1">Marks {props.marks} out of {props.fullm}</label><a style={{paddingTop:"10px"}} href="/studyMaterials">Improve</a></>
            
            :
            <>
            <label for="exampleFormControlTextarea1">Marks {props.fullm}</label>
            </>
            }
        </div> }

        {props.reviewd ?
            null :
            <>
            <button style={{marginTop: "10px"}} onClick={handleAnswerSubmit} class="btn btn-primary">Save Answer</button>
            </>
            }
        </div>
        </div>
)

}