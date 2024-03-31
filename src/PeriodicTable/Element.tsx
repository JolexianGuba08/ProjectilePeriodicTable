import React, { useState } from "react";
import myModule from "./periodic_table_data.tsx";
import Modal from "./QuestModal.tsx";

interface ElementProps {
  num: number;
  showInfo: (num: number) => void;
}

const Element: React.FC<ElementProps> = ({ num, showInfo }) => {
  const [, setHover] = useState<boolean>(false);
  const [isCorrect, setCorrect] = useState<boolean>(false);
  const [openModal, setModalOpen] = useState<boolean>(false);

  const correctAnswer = (): void => setCorrect(true);
  const openInfo = (): void => showInfo(num);
  const onMouseEnter = (): void => setHover(true);
  const onMouseLeave = (): void => setHover(false);

  const onClick = (): void => {
    if (isCorrect) {
      openInfo();
    } else if (!openModal) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  const element = myModule.elements[num];

  return (
      <>
        {openModal && (
            <Modal
                open={openModal}
                onClose={() => setModalOpen(false)}
                num={num}
                updateCorrect={correctAnswer}
            />
        )}
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={`element element-${num} ${element.category} `}
        >
          {isCorrect && (
              <>
                <div className="number">{element.number}</div>
                <div className="symbol">{element.symbol}</div>
                <div className="element-name">{element.name}</div>
              </>
          )}
        </div>
      </>
  );
};

export default Element;