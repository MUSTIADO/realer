import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Website from "./Pages/Website";
import Properties from './Pages/Properties/Properties';
import Value from './Pages/Value/Value';
import Property from "./Pages/Property/Property";
import Payment from "./Pages/Payment/Payment";
import Login from "./components/Account/login";
import AdminPanel from "./components/Admin/AdminPanel";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            {/* Routes for client-side application */}
            <Route path="/" element={<Website />} />
            <Route path="/login" element={<Login />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/value" element={<Value />} />
            <Route path="/payment/:id" element={<Payment />} />

            {/* Routes for admin panel */}
            <Route path="/admin/*" element={<AdminPanel />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
