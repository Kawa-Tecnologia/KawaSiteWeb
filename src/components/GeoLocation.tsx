import React, { useEffect } from 'react';
import axios from 'axios';

interface LocationData {
  latitude: number;
  longitude: number;
}

const GeoLocationComponent: React.FC = () => {
  // Função para obter a localização do usuário
  const getLocation = () => {
    // Verifica se o navegador suporta geolocalização
    if (navigator.geolocation) {
      // Se suportado, solicita a localização do usuário
      navigator.geolocation.getCurrentPosition(
        // Callback de sucesso
        (position) => {
          // Extrai as coordenadas de latitude e longitude
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Envia as coordenadas para o backend
          sendLocationToBackend({ latitude, longitude });
        },
        // Callback de erro
        (error) => {
          // Se o usuário negar o compartilhamento de localização, tente métodos alternativos
          if (error.code === error.PERMISSION_DENIED) {
            // Tenta obter a localização por IP
            getLocationByIp();
          }
        }
      );
    } else {
      // Navegador não suporta geolocalização, tenta método alternativo
      getLocationByIp();
    }
  };

  // Função para obter a localização por IP
  const getLocationByIp = () => {
    // Faz uma solicitação para uma API de geolocalização por IP
    axios.get<LocationData>('https://ipapi.co/json/')
      .then(response => {
        // Extrai as coordenadas de latitude e longitude da resposta
        const latitude = response.data.latitude;
        const longitude = response.data.longitude;

        // Envia as coordenadas para o backend
        sendLocationToBackend({ latitude, longitude });
      })
      .catch(error => {
        console.error('Erro ao obter localização por IP:', error);
        // Aqui você pode lidar com o erro de obter a localização por IP
      });
  };

  // Função para enviar a localização para o backend
  const sendLocationToBackend = (location: LocationData) => {
    // Aqui você pode fazer uma solicitação AJAX para enviar os dados de localização para o backend
    // Por exemplo, usando a biblioteca Axios ou o método fetch
    // Substitua a URL pela sua URL de backend
    const url = 'http://exemplo.com/api/localizacao';
    
    // Exemplo usando Axios
    axios.post(url, location)
      .then(response => {
        console.log('Localização enviada com sucesso:', response.data);
        // Aqui você pode realizar outras ações após o envio bem-sucedido
      })
      .catch(error => {
        console.error('Erro ao enviar localização:', error);
        // Aqui você pode tratar erros de envio
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h1>Obtendo a geolocalização do usuário...</h1>
    </div>
  );
};

export default GeoLocationComponent;