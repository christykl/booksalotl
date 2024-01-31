import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.css";
const Card = ({ book }) => {
  const [show, setShow] = useState<boolean>(false);
  const [bookItem, setItem] = useState();

  let thumbnail =
    book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  if (thumbnail != undefined) {
    return (
      <div>
        <div
          className="card"
          onClick={() => {
            setShow(true);
            setItem(book);
          }}
        >
          <img src={thumbnail} alt="" />
          <div className="bottom">
            <h2 className="title">{book.volumeInfo.title}</h2>
            <h5 className="title">{book.volumeInfo.authors}</h5>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>no thumbnail</div>;
  }
};
export default Card;
