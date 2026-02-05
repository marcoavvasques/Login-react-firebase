import './footer.css';
import Linkedin from '../../images/icons8-linkedin-48.png'

function Footer(){
    return(
        <footer className='footer'>
            <span>© Site criado por Marco Vasques para fins de estudo, todos direitos reservados ©</span>
            <div className='linkedin'>
            <span>Contato profissional no linkedin:</span>
            <a target="blank" rel="external" href={"https://www.linkedin.com/in/marco-vasques-6002483a0/"}>
                  <img src={Linkedin}></img>
                  </a>  
            
            </div>
        </footer>
    )
}

export default Footer;