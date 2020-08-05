import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


function TeacherForm() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0, from: "", to: ''
    }
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0, from: "", to: ''
      }
    ]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    console.log(
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems,
    );

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems}).then(
        (response) => {
          if (response.status === 201) {
            alert('Cadastro realizado com sucesso');
            history.push('/');
          }

        }
      ).catch(
        (error) => alert('Erro no cadastro')
      )
  }

  function setScheduleItemsValue(index:number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((item, i) => {
       if (i === index) {
         return {...item, [field]: value}
       }
       return item;
    });

    setScheduleItems(updatedScheduleItem);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input label="Nome completo" name="name" value={name} onChange={e => setName(e.target.value)} />
            <Input label="Avatar" name="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
            <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <Textarea label="Biografia" name="bio" value={bio} onChange={e => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciência', label: 'Ciência' },
                { value: 'Educação física', label: 'Educação física' },
                { value: 'Física', label: 'Física' }
              ]}
            />

            <Input label="Custo da sua hora por aula" name="cost" value={cost} onChange={e => setCost(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponível

                      <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
                      </button>
            </legend>

            {scheduleItems.length > 0 && scheduleItems.map((scheduleItem, key) => {
              return (
                <div key={key} className="schedule-item">
                  <Select
                    label="Dia da Semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemsValue(key, "week_day", e.target.value) }
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça Feira' },
                      { value: '3', label: 'Quarta Feira' },
                      { value: '4', label: 'Quinta Feira' },
                      { value: '5', label: 'Sexta Feira' },
                      { value: '6', label: 'Sabádo' }
                    ]}
                  />

                  <Input 
                    name="from" 
                    label="Das" 
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemsValue(key, "from", e.target.value) }
                   />

                  <Input 
                    name="to" 
                    label="Até" 
                    type="time" 
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemsValue(key, "to", e.target.value) }
                  />
                </div>
              )

            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="aviso" />
                    Importante! <br />
                    Preencha todos os dados
                  </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;