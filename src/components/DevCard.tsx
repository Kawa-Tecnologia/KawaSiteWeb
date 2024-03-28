import React from 'react';
import '../assets/styles/DevsCard.css';

interface Dev {
  imageSrc: string;
  name: string;
  role: string;
}

const DevCard: React.FC<{ dev: Dev }> = ({ dev }) => {
  return (
    <div className="dev-card">
      <img src={require(`../assets/images/0-minimalist-gift-voucher___media_library_original_1600_914.jpg`)} alt={dev.name} className="dev-image" loading="lazy"  />
      <h3 className="dev-name">{dev.name}</h3>
      <p className="dev-role">{dev.role}</p>
    </div>
  );
};

export default DevCard;