
import './App.css';
 
import {useTelegram} from './hooks/useTelegram'

import {React, useCallback,useEffect, useState} from 'react';
 
import {Routes, Route} from "react-router-dom";
import {Header} from './components/Header/Header';
import {Productlist} from './components/ProductList/ProductList';
 import {Form} from './components/Form/Form';
 

function App() {
  const {tg} = useTelegram();

  useEffect(()=>{
    tg.ready()
  },[])

  const closeEvent =()=>{
    tg.close()
  }

  return (
    <div className="App">
     
      <div className='container'>
        <h1> morisio... I can't move it move it anymore </h1>
        <Header/>
        <Routes>
          <Route index element ={<Productlist/>}/>
          <Route path = {'/form'} element={<Form/>}/>
        </Routes>
        <button onClick = {closeEvent} className="btn">Закрыть</button>
   </div>
    </div>
  );
}

export default App;
