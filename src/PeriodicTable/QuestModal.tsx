import { useState, useEffect, FC } from 'react';

import "./styles/modal.css";
import myModule from "./periodic_table_data";

import wrongSound from "./audio/wrong.mp3"
import correctSound from "./audio/correct.mp3"

interface ModalProps {
    open: boolean;
    onClose:  (value: boolean) => void;
    num: number;
    updateCorrect: () => void;
}

const Modal: FC<ModalProps> = ({ open, onClose , num, updateCorrect }) => {
    const elements = myModule.elements
    const findElement = num;
    const [answers, setAnswers] = useState<string[]>([]);

    const [element, setElement] = useState<null | typeof elements[number]>(null);
    const foundElement = elements.find((el) => el.number === findElement);
    const [correct, setCorrect] = useState(true);
    const [isInitial, setInitial] = useState(true);
    const sampleimage = foundElement?.spectral_img || "";

    const PlaySound = (src: string): void => {
        new Audio(src).play();
    }

    useEffect(() => {
        if (foundElement) {
            const correctAnswer = foundElement.symbol as string;
            const choices: string[]  = [correctAnswer];

            while (choices.length !== 4) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                const randomChoice = randomElement.symbol as string;
                if (!choices.includes(randomChoice)) {
                    choices.push(randomChoice);
                }
            }

            choices.sort(() => Math.random() - 0.5);
            setAnswers(choices);
            setElement(foundElement);
            console.log(choices);
        }
    }, [findElement]);



    const checkAnswer = (answer: string): void => {
        console.log(foundElement?.symbol)
        const isCorrect = answer === foundElement?.symbol;
        setInitial(false)
        if (isCorrect) {
            setCorrect(true);
            PlaySound(correctSound);
            setTimeout(() => {
                updateCorrect();
                onClose(true);
            }, 1500);
        } else {
            setCorrect(false);
            setTimeout(() => {
                setInitial(true);
            }, 800);
            PlaySound(wrongSound);
        }
    }

    if (!open || !foundElement) return null;

    return (
        <div onClick={() => onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={!isInitial ? (correct ? 'modalContainerCheck':'modalContainerWrong') : 'modalContainer'}
            >
                <img src={sampleimage} alt='sample photo' />
                <div className='modalRight'>
                    <p className='closeBtn' onClick={() => onClose}>
                        X
                    </p>
                    <div className='content'>
                        <div className='grid-container'>
                            <p className='grid-item'>
                                Atomic Number : <span>{foundElement.number}</span>
                            </p>
                            <p className='grid-item'>
                                Atomic Mass : <span>{foundElement.atomic_mass || 'None'}</span>
                            </p>
                            <p className='grid-item'>
                                Appearance : <span>{foundElement.appearance || 'None'}</span>
                            </p>
                            <p className='grid-item'>
                                Category : <span>{foundElement.category || 'None'}</span>
                            </p>
                        </div>
                    </div>

                    <div className='content'>
                        <p>{element?.summary}</p>
                    </div>

                    <br />

                    <div className="btnGridContainer">
                        {answers.map((answer, index) => (
                            <div key={index} className="btnContainer">
                                <button
                                    className={index === 0 || index === 3 ? 'btnOutline' : 'btnPrimary'}
                                    onClick={() => checkAnswer(answer)}
                                >
                                    <span className='bold'>{answer}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
