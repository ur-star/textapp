
import './App.css';
import React,{useState} from 'react';
// import About from './components/About';
import  Navbar  from "./components/Navbar";
import Textform from "./components/Textform";
import Alert from './components/Alert';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
  
// } from "react-router-dom";






function App() {
  const [mode, setmode] = useState('light');
  const [alert, setalert] = useState(null);

  const showAlert = (message , type)=>{
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);

  }

  const toggleMode = ()=>{
    // console.log('toggled');
    if(mode === 'light'){
      setmode('dark');
      document.body.style.backgroundColor ='#16161D';
      document.body.style.color ='#c1deff';
      document.body.style.transition ='0.5s';
        showAlert('Dark mode is Enabled','success');
      
    }
    else{
      setmode('light');
      document.body.style.backgroundColor ='#e0feff';
      document.body.style.color ='black';
      document.body.style.transition ='0.5s';
      showAlert('Light mode is Enabled','success');

    }
  }
  return (
    <div className="App">
    {/* <Router> */}
    <Navbar title = 'EpexText' mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert}/>
    <div className='container'>
{/*     
    <Switch>
          <Route path="/about">
            <About mode={mode} />
          </Route>
          <Route path="/"> */}
          <Textform heading='Your Notebook' mode={mode} showAlert = {showAlert}  id ="txtform"/>
          {/* </Route>
        </Switch> */}
    {/* <About/> */}
    </div>
    {/* </Router> */}
    </div>
  );
}

export default App;
