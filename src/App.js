import React, { useState } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
   const pageSize = 8;
   const [progress, setProgress] = useState(0);

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
                    setProgress={setProgress}
                    key="General"
                    pageSize={pageSize}
                    country="in"
                    category="General"
                  />
                }
              />
              <Route
                path="/business"
                element={
                  <News
                    setProgress={setProgress}
                    key="Business"
                    pageSize={pageSize}
                    country="in"
                    category="Business"
                  />
                }
              />
              <Route
                path="/entertainment"
                element={
                  <News
                    setProgress={setProgress}
                    key="Entertainment"
                    pageSize={pageSize}
                    country="in"
                    category="Entertainment"
                  />
                }
              />
              <Route
                path="/health"
                element={
                  <News
                    setProgress={setProgress}
                    key="Health"
                    pageSize={pageSize}
                    country="in"
                    category="Health"
                  />
                }
              />
              <Route
                path="/science"
                element={
                  <News
                    setProgress={setProgress}
                    key="Science"
                    pageSize={pageSize}
                    country="in"
                    category="Science"
                  />
                }
              />
              <Route
                path="/sports"
                element={
                  <News
                    setProgress={setProgress}
                    key="Sports"
                    pageSize={pageSize}
                    country="in"
                    category="Sports"
                  />
                }
              />
              <Route
                path="/technology"
                element={
                  <News
                    setProgress={setProgress}
                    key="Technology"
                    pageSize={pageSize}
                    country="in"
                    category="Technology"
                  />
                }
              />
            </Routes>
          </Router>
        </div>
      </>
    );
}

export default App;
