import Counter from '/src/components/Counter';
import CalendarComponent from '/src/components/Calendar';
import { Route, Routes } from 'react-router';
import Private from './Private';
import Public from './Public';
import logic from '../logic';
const App = () => {
  return (
    <Routes>
      <Route path='*' element={logic.isUserLoggedIn()?<Private/>:<Public/>}/>  {/*Lógica de usuario loggeado*/}
      
    </Routes>
  )
}
  // Usar un objeto Date directamente
//   const startDate = new Date("2023-01-01T00:00:00");

//   return (
//     <div className="app">
//       <h1>App de Salud Mental</h1>
//       <div className="counter-section">
//         <Counter title="Tiempo desde el último ataque" startDate={startDate} />
//       </div>
//       <div className="calendar-section">
//         <CalendarComponent />
//       </div>
//     </div>
//   );
// };

export default App;
