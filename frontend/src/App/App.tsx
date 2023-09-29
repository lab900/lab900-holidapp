import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { Auth } from "../Pages/Auth";
import Home from "../Pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
