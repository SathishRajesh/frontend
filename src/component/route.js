import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./loginform";
import App from "./node";
import Signup from "./signup";
import { New } from "./new";
import Formdetails from "./formdetails";
import Submittedview from "./submittedview";
const RoutingData = () => {
  const [details , setDetails] = React.useState(false);
  const [id, setId] = useState(localStorage.getItem("id"));
  const [role, setRole] = useState();
  const [validate,setValidate]=useState(localStorage.getItem("token"));
  const [newform,setNewForm]=useState(localStorage.getItem("newform"));
  const [newformdetails,setNewFormDetails]=useState(localStorage.getItem("firtsname"));
  const [submittedview,setSubmittedview]=useState()
   
  return (
    <div>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login setlogin={setDetails} setId={setId} setRole={setRole} setValidate={setValidate} setNewForm={setNewForm} setNewFormDetails={setNewFormDetails}/>
          }
        ></Route>
        {validate ? (
          <Route
            exact
            path="/node"
            element={<App id={id} role={role}  validate={validate} newform={newform} newformdetails={newformdetails} submittedview={submittedview} />}
          ></Route>
        ) : (
          <Route exact path="/node" element={<Navigate to="/" />}></Route>
        )}
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/new" element={<New newform={newform} validate={validate}/>}></Route>
        <Route exact path="/submittedview" element={<Submittedview submittedview={submittedview} />}></Route>
        <Route exact path="/formdetails" element={<Formdetails  validate={validate}  newformdetails={newformdetails} setSubmittedview={setSubmittedview}/>}></Route>
      </Routes>
    </Router>

    </div>
  );
};
export default RoutingData;
