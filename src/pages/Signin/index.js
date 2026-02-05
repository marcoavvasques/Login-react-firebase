import { Link } from "react-router-dom";
import './signin.css'
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";

import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
 }
from 'firebase/auth';

import Sign from '../../images/Signin.png';
import { toast } from "react-toastify";


function Signin(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    const [user, setUser] = useState(false);
    const [userDetail, setUserDetail] = useState({});

    const navigate = useNavigate();

//Forçar o usuario a logar no login
async function fazerLogout(){
    await signOut(auth);
    setUser(false);
    setUserDetail({})
    navigate('/signin')
  }
    
//CRIAR USUARIO
async function newUser() {
  
    if(senha !== confirmSenha){
        toast.warn("Senhas diferentes", {
        theme: "colored"
        });
        return;
    }

    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() =>{
      toast.success("Cadastrado com sucesso", {
      theme: "colored"
      })
      fazerLogout();

    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        toast.error("Senha muito fraca!", {
        theme: "colored"
        })
        setSenha('');
        setConfirmSenha('')

      }else if(error.code === 'auth/email-already-in-use'){
        toast.error("Email já existe!", {
        theme: "colored"
        })
        setEmail('');
        setSenha('');
        setConfirmSenha('')

      }else if(error.code === 'auth/invalid-email'){
        toast.error("Digite um email válido!", {
        theme: "colored"
        });
        setSenha('');
        setConfirmSenha('')

      }else if(error.code === 'auth/missing-password'){
        toast.error("É preciso preencher e confirmar a senha antes de seguir!", {
        theme: "colored"
        })
      }
    })

}

    return(
        <main className="container">
            <img src={Sign} alt="Crie sua conta"/>

            <section className='signin'>
                <input type='text' 
                className="email" 
                placeholder='Insira seu email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <input type='password'
                className="senha" 
                placeholder='Crie sua senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}/>

                <input type='password'
                 className="senha" 
                 placeholder='Confirmação da senha'
                 value={confirmSenha}
                 onChange={(e) => setConfirmSenha(e.target.value)}/>

                 <span className="dica">Senha precisa conter ao menos 8 caracters, maiúsculo, minúsculo e numeros.</span>

                <button onClick={newUser}>Conclua o cadastro</button>

                <span>Já tem uma conta? <Link to="/">Inicie sessão</Link></span>
             </section>
        </main>
    )
}

export default Signin;