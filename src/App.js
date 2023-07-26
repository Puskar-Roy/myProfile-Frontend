import './css/App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Recover from './components/Recover';
import Reset from './components/Reset';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Username/>}/>
      <Route path='/register' rxact element={<Register/>}/>
      <Route path='/password' rxact element={<Password/>}/>
      <Route path='/recover' rxact element={<Recover/>}/>
      <Route path='/reset' rxact element={<Reset/>}/>
      <Route path='/profile' rxact element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
