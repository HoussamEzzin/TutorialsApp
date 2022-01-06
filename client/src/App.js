import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
class App extends Component{
    render(){
        return(
            <div>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a href="/tutorials" className="navbar-brand">
                            Home
                        </a>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item" >
                                <Link to={"/tutorials"} className="nav-link">
                                    Tutorials
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add Tutorial
                                </Link>
                            </li>
                        </div>
                    </nav>

                    <div className="container mt-3">
                        <Router>

                                <Routes>

                                    <Route exact path={["/","tutorials"]}  element={<TutorialsList/>}/>
                                    <Route exact path="/add" element={<AddTutorial/>} />
                                    <Route path="/tutorials/:id" element={<Tutorial/>} />
                                </Routes>

                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
