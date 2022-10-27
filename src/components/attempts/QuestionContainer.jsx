import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from "axios";
import { useLocation } from "react-router-dom";
import QuestionItem from "./QuestionItem"; 

export default function QuestionContainer(props) {
    const search = useLocation().search;
    const [open, setOpen] =React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [attms, setAttms]= React.useState( []);

    const [attmsST, setAttmsST]= React.useState( []);


    const [answer, setQuestion]= React.useState(props.answer);
    const [marks, setMarks]= React.useState(props.marks);
    const [subject, setSubject]= React.useState("Quiz");
    const [atId, setAtId]= React.useState(0);
    const student=new URLSearchParams(search).get("std");
    const usr=new URLSearchParams(search).get("usr");
    const sub_id=new URLSearchParams(search).get("sub");
    const is_student=new URLSearchParams(search).get("isStudent");
    const atm_id=new URLSearchParams(search).get("atm");
     
    const [sub, setSub]= React.useState('');
    const [path, setPath]= React.useState('');
    const [atm, setAtm]= React.useState('');
    useEffect(() => {
        getSubject();
    },[]);

    const handleSlcChange = (e) =>{
        setSubject(e.target.value);     
    }

    const handleSubmit = () => {
        const quest = {subject:subject, question:"" , marks: marks};
        axios.post('http://localhost:5000/api/newQuestion', quest).then((res)=>{                        
            alert("Quize Added Successfully!");
        });
    }

    function getSubject(){
        
        axios.get('http://localhost:5000/api/subject/'+sub_id).then((res)=>{                        
            console.log('details --', res.data.data);
            setSubject(res.data.data[0].subject+" - "+ res.data.data[0].path); 
            setPath(res.data.data[0].path);
            setSub(res.data.data[0].subject);
            if(usr != 'tutor'){
                console.log('here --', 'http://localhost:5000/api/getQuestions/'+sub+'/'+path);
                axios.get('http://localhost:5000/api/getQuestions/'+res.data.data[0].subject+'/'+res.data.data[0].path).then((res)=>{                        
                console.log('here', res.data.data);
                setAttmsST(res.data.data); 
                initiateAttempt();
                });
            }
            getAttempts();
        });
    }
    function getAttempts(){
        
        if(usr == 'tutor'){
        axios.get('http://localhost:5000/api/getAttempt/'+student+'/'+sub_id+'/'+atm_id).then((res)=>{      
        // axios.get('http://localhost:5000/api/getAttempt/'+student+'/'+sub_id).then((res)=>{                    
            console.log('attempt data', res.data.data);
            setAttms(res.data.data); 
        });
        }
        else{
            
        }
        
    }

    const initiateAttempt = () => {
        const today = Date.now();
        var todayStr = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
        const quest = {subject:sub_id, student:student , date:todayStr };
        axios.post('http://localhost:5000/api/newAttempt', quest).then((res)=>{                        
            console.log("attempt initialized!", res.data);
            setAtId(res.data.id);

        });
    }

return (
    <>
    <div className="container" >
    <div className="row" style={{margin: "50px", width:"850px"}}>
    <h3>{subject}</h3>
    {attms != null ? attms.map ((item,index) => (
            <><QuestionItem id={index+1} sub={sub_id} attemptid={item.attemptid} quest={item.question} ans={item.answer} marks={item.marks} fullm={item.decideMarks} tutor={is_student == "0"} reviewd={item.answer.trim().length > 0}></QuestionItem></>
        )) : null}
    {attmsST != null ? attmsST.map ((item,index) => (
            <><QuestionItem id={index+1} sub={sub_id} qid={item.id} attemptid={atId} quest={item.question} ans={""} marks={0} fullm={item.marks} tutor={false} reviewd={false}></QuestionItem></>
        )) : null}
    </div>
    </div>
    </>
)

}