import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Changement de sens du signe ">" pour que les projets dans le caroussel s'affichent du plus ancien au plus récent
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    if(byDateDesc) {
      nextCard();
    }
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout de la div manquante qui englobe l'image, les informations et les bullet point
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${ index === idx ? "display" : "hide" }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Ajout de la fonctionnalité permettant de faire défiler les bullet point du caroussel */}
              {byDateDesc?.map((dot, radioIdx) => (
                <input
                  key={dot.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
