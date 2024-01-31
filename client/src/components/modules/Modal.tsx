import React from "react";
const Modal = ({ show, item, onClose, userId }) => {
  if (!show) {
    return null;
  }
  let thumbnail = item.cover;
  return (
    <div>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            X
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <h2>{item.title}</h2>
              <h4>{item.authors}</h4>
              <h5>
                {item.publisher}
                <span>{item.published_date}</span>
              </h5>
              <br />
              <a href={item.preview_link}>
                <button>More</button>
              </a>
            </div>
          </div>
          <div className="description">
            <h4 className="description">{item.description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
