import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Team from './componentes/telas/teams/Team'
import Player from './componentes/telas/players/Player'

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route exact="true" path='/' element={<Home/>}/>
        <Route exact="true" path='/teams' element={<Team/>}/>
        <Route exact="true" path='/players' element={<Player/>}/>
      </Routes>
    </Router>
  );
}

export default App;
