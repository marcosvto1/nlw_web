import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars3.githubusercontent.com/u/7772980?s=460&u=976f5e43d532ba1449ca5063fe012a5bd379fe59&v=4" alt="Marco"/>
            <div>
                <strong>Marcos Tomz</strong>
                <span>Nestjs</span>
            </div>
        </header>
        <p>
            Entusiasta das melhores tecnologias de programacao avançada
            <br/><br/>
            Apaixonado por programar e mudar a vidas das pessoas
        </p>
        <footer>
            <p>
                Preço/Hora <strong>R$ 80,00</strong>
            </p>

            <button type="button">
                <img src={whatsappIcon} alt="icon whatsapp" />
                Entrar em contato
            </button>
        </footer>
        </article>
    )
}

export default TeacherItem;