import { BrowserRouter,Routes, Route } from "react-router-dom";
import "./App.css";
import Website from "./Pages/Website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Properties from './Pages/Properties/Properties';
import Value from './Pages/Value/Value';
import Property from "./Pages/Property/Property";
import Payment from "./Pages/Payment/Payment"; // Import Payment component


function App() {
  
  return (
    
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<Layout/>} >
      <Route path="/" element={<Website />} /> 
      <Route path="/properties" element={<Properties/>} />
      <Route path="/property/:id" element={<Property/>} />
      <Route path="/value" element={<Value/>} />
      <Route path="/payment/:id" element={<Payment />} /> {/* Payment page */}

     </Route>
    </Routes>
    </Suspense>
    </BrowserRouter>
    
   
      
  );
}

export default App;