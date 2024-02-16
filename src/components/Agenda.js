import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserContainer from "./UserContainer";
import Menu from "./Menu";

const Agenda = ({ ordersData }) => {
  const [agenda, setAgenda] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const orders = [
    {
      producer_id: 1,
      client_id: 2,
      training: {
        id: 3,
        created_at: new Date("2024-02-13T10:00"),
        title: "Treinamento 1",
        trainer: "Treinador 1",
        time: "10:00",
      },
      value: 100.0,
      points: 50,
      discount: 10.0,
      quantity: 1,
      payment_id: 4,
    },
    {
      producer_id: 1,
      client_id: 2,
      training: {
        id: 3,
        created_at: new Date("2024-02-16T10:00"),
        title: "Treinamento 2",
        trainer: "Treinador 1",
        time: "10:00",
      },
      value: 100.0,
      points: 50,
      discount: 10.0,
      quantity: 1,
      payment_id: 4,
    },
  ];

  const sendWhatsAppMessage = (training) => {
    console.log(
      `Enviando mensagem de WhatsApp para ${training.trainer}: ${training.title}`
    );
  };

  const markTraining = (training) => {
    setAgenda([...agenda, training]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      agenda.forEach((training) => {
        const trainingTime = new Date(training.date + " " + training.time);
        const difference = trainingTime.getTime() - now.getTime();
        const hoursDifference = difference / (1000 * 3600);
        if (hoursDifference <= 1 && hoursDifference > 0) {
          sendWhatsAppMessage(training);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [agenda]);

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="main-content">
        <div className="agenda">
          <h2>Agenda</h2>
          <div className="calendar">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const hasTraining = orders.some((training) => {
                  const trainingDate = new Date(training.training.created_at);
                  return trainingDate.toDateString() === date.toDateString();
                });
                return (
                  hasTraining && <p className="training-marker">Treinamento</p>
                );
              }}
            />
          </div>
          <div className="agenda-items">
            {orders.map((training) => (
              <div key={training.training.id} className="agenda-item">
                <h3>{training.training.title}</h3>
                <p>Treinador: {training.training.trainer}</p>
                <p>Data: {training.training.created_at.toDateString()}</p>
                <p>Hora: {training.training.time}</p>
                <button onClick={() => markTraining(training)}>Marcar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
