import React, { useState} from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App =()=>{
   const pageSize = 8;
   const apiKey = process.env.REACT_APP_API;

    const [progress, setProgress]= useState(0);

  
  
    return (
      <>
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
            color="#f11946" 
            progress={progress}        
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="General"
                  pageSize={pageSize}
                  country="in"
                  category="General"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Business"
                  pageSize={pageSize}
                  country="in"
                  category="Business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Entertainment"
                  pageSize={pageSize}
                  country="in"
                  category="Entertainment"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Health"
                  pageSize={pageSize}
                  country="in"
                  category="Health"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Science"
                  pageSize={pageSize}
                  country="in"
                  category="Science"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Sports"
                  pageSize={pageSize}
                  country="in"
                  category="Sports"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="Technology"
                  pageSize={pageSize}
                  country="in"
                  category="Technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      </>
    );
  }
  export default App;

