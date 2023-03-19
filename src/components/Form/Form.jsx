import {React,useCallback,useEffect,useState} from 'react';
import {useTelegram} from '../../hooks/useTelegram'

import './Form.css';
export const Form =()=>{
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [subject, setSubject] = useState('');

    const {tg} = useTelegram();

    const onSendData = useCallback(()=>{
           const data = {
            country, city, subject
           }
           tg.sendData (JSON.stringify(data))
 }, [city, country, subject])

 const onChangeCity =(e) =>{
  setCity(e.terget.value);
 }
 const onChangeCountry =(e) =>{
  setCountry(e.terget.value);
 }
 const onChangeSubject =(e) =>{
  setSubject(e.terget.value);
 }

 useEffect(()=>{
           tg.onEvent('mainButtonClicked',onSendData)
           return() =>{
            tg.offEvent('mainButtonClicked', onSendData)
           }
          })
          useEffect(()=>{
            tg.MainButton.setParams({
              text: 'скинуть айпишк'
            })
          },[])
          useEffect(()=>{
            if (!country|| !city){
              tg.MainButton.hide();
            }else{
              tg.MainButton.show();
            }
          },[country,city])
    
    return(
        <>
         
        <h3>Введите ваши данные:</h3>
        <input
        className='input'
        type = 'text'
        placeholder='Город'
        value={city}
        onChange= {onChangeCity}
        />
        <input 
        className='input'
        type = 'text'
        placeholder='Дом'
        value= {subject}
        onChange= {onChangeSubject}
         />
         <select value={subject} onChange={onChangeSubject} className='select'>
            <option value={'legal'}>Физ.Лицо</option>
            <option value={'legal'}>Юрю.Лицо</option>
         </select>
         </>
    )
}