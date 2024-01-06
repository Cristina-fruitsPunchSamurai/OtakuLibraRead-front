
import MangaPage from './components/MangaPage';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup';
import { Home } from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import MangaList from './components/MangaList';

function App() {
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
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path="/mangas" element={<MangaList />}/>
          <Route path="/manga/:id" element={<MangaPage />}/>
      </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
