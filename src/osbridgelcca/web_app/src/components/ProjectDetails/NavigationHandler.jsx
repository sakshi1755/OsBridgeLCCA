// src/components/NavigationHandler.jsx
import { useState } from 'react';
import { FORM_SEQUENCE } from '../constants/formSequence';

const NavigationHandler = ({ currentForm, setSelectedProjectDetailWindow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(null);

  const handleClick = (dir) => {
    setDirection(dir);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const index = FORM_SEQUENCE.indexOf(currentForm);
    let nextForm = null;

    if (direction === 'next' && index < FORM_SEQUENCE.length - 1) {
      nextForm = FORM_SEQUENCE[index + 1];
    } else if (direction === 'back' && index > 0) {
      nextForm = FORM_SEQUENCE[index - 1];
    }

    if (nextForm) {
      setSelectedProjectDetailWindow(nextForm);
    }

    setIsModalOpen(false);
    setDirection(null);
  };

  return (
    <>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleClick('back')}
          className="px-4 py-2 bg-gray-300 border border-black rounded"
        >
          Back
        </button>
        <button
          onClick={() => handleClick('next')}
          className="px-4 py-2 bg-blue-300 border border-black rounded"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Do you want to save this data and go {direction}?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 px-3 py-1 border">Cancel</button>
              <button onClick={handleConfirm} className="px-3 py-1 bg-green-400 border border-black">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationHandler;
