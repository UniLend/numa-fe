import { useState, FC } from "react";
import Image from "next/image";
// import DownArrow from "../../public/images/down-arrow.svg";
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: FC<FAQAccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='container acc_bx'>
      {items.map((item, index) => (
        <div key={index} className='item'>
          {/* Question */}
          <div
            onClick={() => handleToggle(index)}
            className={`question ${activeIndex === index ? "active" : ""}`}
          >
            <span>{item.question}</span>
            <span className={`icon ${activeIndex === index ? "rotated" : ""}`}>
              <Image
                className='downArrow'
                src='/images/arrow-down-white.svg'
                alt='Down arrow'
                width={15}
                height={15}
              />
            </span>
          </div>

          <div className={`answer ${activeIndex === index ? "expanded" : ""}`}>
            <div>{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
