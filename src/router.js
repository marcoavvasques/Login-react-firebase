import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Signin from './pages/Signin';
import User from './pages/User';
import AlterarSenha from './pages/AltPass';
import Error from './pages/Error';
import Footer from './components/footer';

function RoutesLink(){
    return(
    <BrowserRouter>
     <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/signin" element={ <Signin/> } />
        <Route path="/user" element={ <User/>} />
        <Route path="senha" element={ <AlterarSenha/>} />

        <Route path="*" element={ <Error/> } />

     </Routes>
     <Footer/>
    </BrowserRouter>
    )
}

export default RoutesLink;