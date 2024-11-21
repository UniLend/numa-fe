// components/FAQAccordion.js
import { useState } from 'react';

const FAQAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', color: '#333' }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
        >
          {/* Question */}
          <div
            onClick={() => handleToggle(index)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: activeIndex === index ? '#fff' : '#fff',
              padding: '10px 0',
            }}
          >
            <span>{item.question}</span>
            {/* <span>{activeIndex === index ? '▲' : '▼'}</span> */}
            <span style={{
              display: 'inline-block',
              transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out'
            }}>▼</span>
          </div>

          <div
            style={{
              maxHeight:
                activeIndex === index ? `${item.answer.length * 0.5}px` : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out',
              color: '#fff',
            }}
          >
            <div style={{ padding: '10px 0' }}>{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
