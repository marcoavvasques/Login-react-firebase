import { Link } from "react-router-dom";
import './login.css'
import welcome from '../../images/welcome.png'

import User from "../User";

import { auth } from "../../firebaseConnection";

import { 
  signInWithEmailAndPassword,
  onAuthStateChanged
 }
from 'firebase/auth';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function Login(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const navigate = useNavigate();

useEffect(() => {
  async function checkLogin(){
    onAuthStateChanged(auth, (user) =>{
      if(user){
        navigate('/user', { replace: true});
        
      }else{
        setUser(false);
        setUserDetail({});
      }
    })
  }
  checkLogin();
}, [navigate])

/*
setUser(true);
        setUserDetail({
          uid: user.uid,
          email: user.email,*/

  async function loginUser(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      toast.success("Usário logado com sucesso!", {
      theme: "colored"
      })

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })

      setUser(true);

      setEmail('');
      setSenha('');
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found'){
         toast.error("Usuário não encontrado", {
         theme: "colored"
          });
         setSenha('');

      }else if(error.code === 'auth/wrong-password'){
        toast.error("Senha incorreta", {
        theme: "colored"
        });
        setSenha('');

      }else if(error.code === 'auth/invalid-email'){
        toast.error("Email inválido", {
        theme: "colored"
        });

      }else if(error.code === 'auth/too-many-requests'){
        toast.error("Email ou senha digitados errados muitas vezes, tente novamente daqui uns minutos", {
        theme: "colored"
        });
        setSenha('');
        setEmail('');

      }else if(error.code === 'auth/invalid-credential'){
        toast.error("Email ou senha incorretos", {
        theme: "colored"
        });

      }else{
        toast.error("Verifique sua conexão", {
        theme: "colored"
        });
      }
     
    })
  }

    return(
        
        

        <main className="container">
            
            <img src={welcome} alt="bem vindo"/>
            <section className='login'>

                <input className="email" 
                type='text'
                placeholder='Email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input className="senha"
                 type='password' 
                 placeholder='Senha'
                 value={senha}
                 onChange={(e) => setSenha(e.target.value)}
                 />

                <button onClick={loginUser}>Inicie a sessão</button>

                 <span className="criar">Não tem uma conta? <Link to="/signin">Clique aqui!</Link></span>
                 <span className="redefinir">Esqueceu a senha? <Link to="/senha"> Altere aqui!</Link></span>
            </section>        
            
        </main>
    )
}

export default Login;