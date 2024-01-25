//popup for inputting book info such as date read, genre, and rating

import React, { useState } from "react";


const BookInfo = ({ item, onClose }) => {
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
              <h1>{item.title}</h1>
              <h3>{item.authors}</h3>
              <h5>
                {item.publisher}
                <span>{item.published_date}</span>
              </h5>
              <br />
              {/* <a href={item.preview_link}>
                <button>More</button>
              </a> */}
              <input type="date" id="date" name="date" />
              <input type="text" id="genre" name="genre" placeholder="Genre" />
              <input type="text" id="rating" name="rating" placeholder="Rating" />  
              <button>add book</button>
            </div>
          </div>
          <div className="description">
            <h4 className="description">{item.description}</h4>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BookInfo;