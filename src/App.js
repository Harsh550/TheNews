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
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
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
                  category="business"
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
                  category="entertainment"
                />
              }
            ></Route>
            
            <Route
              path="/science"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="science"
                  pageSize={pageSize}
                  country="in"
                  category="science"
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
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/tech"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey}
                  key="tech"
                  pageSize={pageSize}
                  country="in"
                  category="tech"
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

