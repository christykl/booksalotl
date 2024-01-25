import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.css";
// import "./Card.css";

const LibraryCard = ({ book, userId }) => {
  const [show, setShow] = useState<boolean>(false);
  const [bookItem, setItem] = useState();

  let thumbnail = book.cover;
  if (thumbnail != undefined) {
    return (
      <div className="card">
        <div
          className="card"
          onClick={() => {
            setShow(true);
            setItem(book);
          }}
        >
          <img src={thumbnail} alt="" />
          <div className="bottom">
            <h3 className="title">{book.title}</h3>
            <h4 className="subtitle">{book.authors}</h4>
          </div>
        </div>
        <Modal userId={userId} show={show} item={bookItem} onClose={() => setShow(false)} />
      </div>
    );
  } else {
    return <div>no thumbnail</div>;
  }
};
export default LibraryCard;
