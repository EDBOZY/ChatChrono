import { useContext } from "react";
import { Entry } from "./Pages/Entry";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import "./style.scss";
import  {BrowserRouter,Navigate,Route,Routes}  from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
function App() {
  const {currentuser}=useContext(AuthContext)
  const ProtectedRoute=({children})=>{
    if(!currentuser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Entry/>}/>
          <Route path="home" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   
    
  );
}

export default App;
