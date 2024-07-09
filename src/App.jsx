import { BrowserRouter,Routes, Route } from "react-router-dom";
import "./App.css";
import Website from "./Pages/Website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Properties from './Pages/Properties/Properties';
import Value from './Pages/Value/Value';

function App() {
  
  return (
    
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<Layout/>} >
      <Route path="/" element={<Website />} /> 
      <Route path="/properties" element={<Properties/>} />
      <Route path="/value" element={<Value/>} />
     </Route>
    </Routes>
    </Suspense>
    </BrowserRouter>
    
   
      
  );
}

export default App;