import React, {useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {ITeacher} from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);

    async function searchTeachers(e: FormEvent) {
      e.preventDefault();
      setLoading(true);
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      });

      setTeachers(response.data);
      setLoading(false);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title="Estes são os proffys diponivel"
            >
                <form id="search-teachers" onSubmit={searchTeachers}>
                  <Select 
                    label="Matéria" 
                    name="subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    options={[
                      { value: 'Artes', label: 'Artes' },
                      { value: 'Biologia', label: 'Biologia' },
                      { value: 'Ciência', label: 'Ciência'},
                      { value: 'Educação física', label: 'Educação física'},
                      { value: 'Física', label: 'Física'}
                    ]}
                  />

                  <Select 
                    label="Dia da Semana" 
                    name="week_day"
                    value={week_day}
                    onChange={e => setWeekDay(e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça Feira'},
                      { value: '3', label: 'Quarta Feira'},
                      { value: '4', label: 'Quinta Feira'},
                      { value: '5', label: 'Sexta Feira'},
                      { value: '6', label: 'Sabádo'}
                    ]}
                  />          

                  <Input 
                    label="Hora" 
                    name="time" 
                    type="time" 
                    value={time}
                    onChange={e => {
                        setTime(e.target.value)
                      }
                    }
                  />

                  <button type="submit">
                    Buscar
                  </button>
                    
                </form>
            </PageHeader>

            <main>
                {loading && (
                  <div style={{textAlign: 'center'}}>Carregando</div>
                )}

                {teachers.map((teacher: ITeacher) =>  <TeacherItem key={teacher.id} teacher={teacher} /> )}
               
            </main>

        </div>
    );
}

export default TeacherList;