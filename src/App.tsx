
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
import NewManga from './pages/NewManga';

function App() {
    const [isLogged, setIsLogged] = useState(false);
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
            <Route path='/add-manga' element={<NewManga />}/>
        </Routes>
      </LoginContext.Provider>
      </ThemeProvider>
    </div>
  )
}

export default App


//Nested routes seait

//-----Au lieu de ça :
{/* <Route path="/manga" element={<MangaList />}/>
<Route path="/manga/:id" element={<MangaPage />}/>
<Route path="/manga/new" element={<AddManga />}/> */}


//----- Ce serait ça :

{/* <Route path="/manga" >
          <Route index element={<MangaList/>}/>
          <Route path=":id" element={<MangaPage />}/>
          <Route path="new" element={<AddManga />}/> */}
{/* </Route> */}
