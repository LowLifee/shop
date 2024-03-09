import { useHttp } from '../../hooks/http.hook';
import { useState, useEffect, useCallback } from 'react';
import MainPage from '../mainPage/MainPage';

import './App.css';

function App() {
  //console.log('renderApp')
  //const { request } = useHttp();
  //const [data, setData] = useState(null);
  //const getData = useCallback(async () => {
  //  request().then(res => {
  //    console.log(res)
  //    console.log('work')
  //  })
  //}, [])




  return (
    <div className="App">
      <MainPage />
      {/*<button onClick={getData}>Click me</button>*/}
    </div>
  );
}

export default App;
