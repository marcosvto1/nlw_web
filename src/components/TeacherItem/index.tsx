import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface ITeacher {  
    id: number;
    name: string;
    avatar: string;
    bio: string,
    cost: number,
    subject: string,
    whatsapp: string,
    user_id: number
}

export interface ITeacherItemProps {
  teacher: ITeacher
}

const TeacherItem: React.FC<ITeacherItemProps> = ({teacher}) => {

    function createNewConnection() {
      api.post('connections', {user_id: teacher.user_id});
    }

    return (
        <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt="avatarsss"/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>
           {teacher.bio }
        </p>
        <footer>
            <p>
              Preço/Hora <strong>R$ {teacher.cost}</strong>
            </p>

            <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text='Olá encontrei você no proffy'`}>
                <img src={whatsappIcon} alt="icon whatsapp" />
                Entrar em contato
            </a>
        </footer>
        </article>
    )
}

export default TeacherItem;