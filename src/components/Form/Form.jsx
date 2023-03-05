import {React,useState} from 'react';
import './Form.css';
export const Form =()=>{
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [subject, setSubject] = useState('');
    return(
        <>
          {alert("whf")}
        <h3>Введите ваши данные:</h3>
        <input
        className='input'
        type = 'text'
        placeholder='Город'
        />
        <input 
        className='input'
        type = 'text'
        placeholder='Дом'
         />
         <select className='select'>
            <option value={'legal'}>Физ.Лицо</option>
            <option value={'legal'}>Юрю.Лицо</option>
         </select>
         </>
    )
}