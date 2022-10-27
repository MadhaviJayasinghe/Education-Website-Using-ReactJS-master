import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
//import axios from "axios";
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { makeStyles } from '@mui/styles';
import { styles, difficulties, createMarkup } from "../helpers";
import QuizAnswers from "./QuizAnswers";
import {trivia_categories,results} from "./Store/category";

const useStyles = makeStyles((theme) => {
  return styles;
});

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  //const [data] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();
  const [subject, setSubject]= React.useState("");
  const [btnEnable, setEnable]= React.useState(false);
  const [subjects, setSub]= React.useState( []);
  useEffect(() => {
      getSubjects();
      window.scrollTo(0, "20px");
  },[]);


  function getSubjects(){
    axios.get('http://localhost:5000/api/subjects').then((res)=>{                        
        console.log('data', res.data.data);
        setSub(res.data.data); 
    });
  }
  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleSlcChange = (e) =>{
    setSubject(e.target.value); 
    if(e.target.value != 'Select Option'){
      setEnable(true);  
      subjects.forEach(element => {
        if(element.id == e.target.value){
          localStorage.setItem('category',element.subject +" "+element.path);
        }
      });
    }
    else
      setEnable(false); 
}
  const resetQuiz = (e) => {
    e.preventDefault();
    window.scrollTo(0, "20px");
  };

  return (
    
      <div className="container" >
    <div className="row" style={{margin: "50px", width:"850px"}}>
    
    <div className="card col-8" >
       <div className="card-body" >
       <h5 className="card-title">Start Quize</h5>
        <div class="form-group">
            <label for="exampleFormControlInput1">Select Subject</label>
            <select class="form-control" value={subject} onChange={handleSlcChange} id="exampleFormControlSelect1">
            <option>Select Option</option>
            {subjects != null ? subjects.map (item => (
             <option value={item.id}>{item.subject} - {item.path}</option>
        )) : null}
            </select>
        </div>
        
        {btnEnable ?
        <a className="btn-primary" style={{marginTop: "10px"}}  class="btn btn-primary" href={`/attempt?std=S001&sub=${subject}&usr=student&isStudent=1`} >Start Quiz</a>
        : null }
        </div>
        </div>
    
    
    </div>
    </div>
    
  );
};

export default QuizCategories;
