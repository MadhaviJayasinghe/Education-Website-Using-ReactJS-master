import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Quiz from "./components/quiz/QuizCategories"
import MakeQuiz from "./components/make question/MakeQuestion"
import AttemptList from "./components/attempts/AttemptList"
import AttemptContainer from "./components/attempts/QuestionContainer"
import LastAttemptsStudent from "./components/attempts/LastAttempts"
import MaterialsList from "./components/materials/Materials"


function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/makequiz' component={MakeQuiz} />
          <Route exact path='/attemptList' component={AttemptList} />
          <Route exact path='/attempt' component={AttemptContainer} />
          <Route exact path='/studentLastAttempts' component={LastAttemptsStudent} />
          <Route exact path='/studyMaterials' component={MaterialsList} />
          
        </Switch>
      </Router>
    </>
  )
}

export default App
