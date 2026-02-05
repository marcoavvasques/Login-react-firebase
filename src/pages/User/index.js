import './user.css';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";

import { 
  onAuthStateChanged,
  signOut,
  updatePassword
 } from 'firebase/auth';
import { toast } from 'react-toastify';

function User(){
    const navigate = useNavigate();

    const [user, setUser] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [novaSenha, setNovaSenha] = useState('');

    const handleUser = auth.currentUser;

    useEffect(() => {
  async function checkLogin(){
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setUser(true);
        setUserDetail({
          uid: user.uid,
          email: user.email,
        })
      }else{
        setUser(false);
        setUserDetail({});
      }
    })
  }
  checkLogin();
}, [])

 async function fazerLogout(){
    await signOut(auth);
    setUser(false);
    setUserDetail({})
    navigate('/')
  }

  async function changePassword() {
    await updatePassword(handleUser, novaSenha)
    .then(() => {
      toast.success("Senha alterada com sucesso!", {
      theme: "colored"
      })
      setNovaSenha('')
    })
    .catch((error) => {
      if(error.code === 'auth/requires-recent-login'){
        toast.warn("Sessão finalizada, iniciei novamente", {
        theme: "colored"
        });
        navigate('/');
        
      }else if(error.code === 'auth/weak-password'){
       toast.warn("Senha fraca", {
        theme: "colored"
        });
      }
    })
  }

    return(
        <main>

    { user && (
        <section>
          <strong> Seja bem-vindo(a) </strong>

          <span><p>Seu ID:</p> {userDetail.uid}</span>

          <span><p>Email:</p> {userDetail.email}</span>

          <span><p>Senha:</p>
          <input 
          type='password'
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder='Digite nova senha'
          />
          </span>

          <span className="dica">Senha precisa conter ao menos 8 caracters, maiúsculo, minúsculo e numeros.</span>
    
          <button onClick={changePassword}>Alterar Senha</button>

          <button onClick={fazerLogout}>Finalizar sessão</button>
        </section>
      )}
      
      </main>
)
    
}
export default User;