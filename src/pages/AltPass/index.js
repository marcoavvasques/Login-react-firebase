import { useState } from "react";

import "./pass.css"

import { Link } from "react-router-dom";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConnection";
import { toast } from "react-toastify/unstyled";

function AlterarSenha(){
    const [email, setEmail] = useState('');


    async function altPassword() {

        await sendPasswordResetEmail(auth, email)
        .then((email) => {
            toast.success("Email de recuperação enviado!", {
            theme: "colored"
            })
        })
        .catch((error) => {
            toast.error("Erro ao enviar", {
            theme: "colored"
            })
        })
    }

    return(
        
        <main className="container-pass">
            <section className="password">
                <label>Alterar Senha</label>
                <input 
                type="email"
                value={email}
                className="email"
                placeholder="Confirme seu email"
                onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={altPassword}>Mandar email de confirmação</button>
                <Link to="/">Voltar</Link>
            </section>
        </main>
    );
}

export default AlterarSenha;