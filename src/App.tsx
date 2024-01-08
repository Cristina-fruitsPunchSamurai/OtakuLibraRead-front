
import MangaPage from './components/MangaPage';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup';
import { Home } from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import MangaList from './components/MangaList';
import { useState } from 'react';
import { LoginContext } from './Contexts/LoginContext';

function App() {
    const [isLogged, setIsLogged] = useState(false);
  console.log('isLogged on app',isLogged)
      //Theme MUI afin de changer le fotnFamilysur les MUi components
      const theme = createTheme({
        typography: {
            "fontFamily": 'Orbitron',
        }
    });

  return (
    // className dark
    <div>
      <ThemeProvider theme={theme}>
        <LoginContext.Provider value={{isLogged, setIsLogged}}>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="/mangas" element={<MangaList />}/>
            <Route path="/manga/:id" element={<MangaPage />}/>
            <Route path='/signup' element={<Signup />}/>
        </Routes>
      </LoginContext.Provider>
      </ThemeProvider>
    </div>
  )
}

export default App
