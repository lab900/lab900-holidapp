import React from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";
import {Auth} from "../components/Auth";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Auth />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

