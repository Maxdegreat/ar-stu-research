import React from 'react';

const Card = ({ URL, summary, title }) => {
  const cardStyle = {
    borderRadius: '8px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '16px',
    maxWidth: '350px',
    padding: '8px',
    marginRight: '8px'
  };

  const linkStyle = {
    color: 'blue', // Set the link color to blue
    textDecoration: 'none', // Remove default underline
    fontWeight: 'bold', // Optionally set font weight
  };

  return (
    <div className="card" style={cardStyle}>
      <h2>{title}</h2>
      <p>{summary}</p>
      <a href={URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        View Details
      </a>
    </div>
  );
};

export default Card;
