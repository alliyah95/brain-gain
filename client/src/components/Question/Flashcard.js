import { useState } from "react";

// const Flashcard = ({ question, answer }) => {
//     const [isFlipped, setIsFlipped] = useState(false);

//     const flipHandler = () => {
//         setIsFlipped(!isFlipped);
//     };

//     return (
//         <div className="min-h-[70vh] mx-auto my-6">
//             <div className="flip-card text-2xl lg:text-3xl break-all">
//                 <div className="flip-card-inner">
//                     <div className="flip-card-front">
//                         <p className="text-xs md:text-sm opacity-60 mb-2">
//                             Question
//                         </p>
//                         {question}
//                     </div>
//                     <div className="flip-card-back">
//                         {
//                             <p className="text-xs md:text-sm opacity-60 mb-2">
//                                 Answer
//                             </p>
//                         }
//                         {answer.toString()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="min-h-[70vh] mx-auto my-6">
            <div
                className={`flip-card text-2xl lg:text-3xl break-all ${
                    isFlipped ? "is-flipped" : ""
                }`}
                onClick={flipHandler}
            >
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p className="text-xs md:text-sm opacity-60 mb-2">
                            Question
                        </p>
                        {question}
                    </div>
                    <div className="flip-card-back">
                        {
                            <p className="text-xs md:text-sm opacity-60 mb-2">
                                Answer
                            </p>
                        }
                        {answer.toString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
