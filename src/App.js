import RoutesLink from "./router";
import './app.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div>
      <ToastContainer autoClose={3000}/>
      <RoutesLink/>
      </div>
  );
}

export default App;
