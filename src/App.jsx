import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'
import Login from './componentes/telas/login/Login'
import Home from './componentes/Home'
import Team from './componentes/telas/teams/Team'
import Player from './componentes/telas/players/Player'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<MenuPublico />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route  path="/privado" element={<MenuPrivado />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="players" element={<Player />} />
          <Route exact="true" path="teams" element={<Team />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>        
      </Routes>
    </Router>
  );
}

export default App;
