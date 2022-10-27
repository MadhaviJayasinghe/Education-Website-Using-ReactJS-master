import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
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
          {/* <Route exact path='/about' component={About} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/journal' component={Blog} />
          <Route exact path='/contact' component={Contact} /> */}
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/makequiz' component={MakeQuiz} />
          <Route exact path='/attemptList' component={AttemptList} />
          <Route exact path='/attempt' component={AttemptContainer} />
          <Route exact path='/studentLastAttempts' component={LastAttemptsStudent} />
          <Route exact path='/studyMaterials' component={MaterialsList} />
          
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
