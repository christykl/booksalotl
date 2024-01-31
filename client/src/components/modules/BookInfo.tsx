//popup for inputting book info such as date read, genre, and rating

import React, { useEffect, useState } from "react";
import Genre from "./Genre";
import Status from "./Status";
import { Rating } from "@mantine/core";

const BookInfo = ({ item, onClose, datecb, ratingcb, genrecb, addbook, dropdowncb, statuscb }) => {
  let thumbnail =
    item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let today = new Date();
  const [genre, setGenre] = useState<string>("");
  const [date, setDate] = useState<string>(today.toString());
  const [rating, setRating] = useState<number>(0);
  const [submit, setSubmit] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("read");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      dropdowncb();
      addbook(item);
    }
  }, [submit]);

  useEffect(() => {
    datecb(new Date(date));
  }, [date]);

  useEffect(() => {
    ratingcb(rating);
  }, [rating]);

  useEffect(() => {
    genrecb(genre);
  }, [genre]);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    statuscb(status);
  }, [status]);

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
              <h3>{item.volumeInfo.title}</h3>
              <h4>{item.volumeInfo.authors}</h4>
              <h5>
                {item.volumeInfo.publisher}
                <span>{item.volumeInfo.published_date}</span>
              </h5>
              <br />
              <form onSubmit={handleSubmit}>
                {status==="read" && (
                  <>
                    <label htmlFor="date">Date Completed:</label>
                    <input
                      type="date"
                      min="1900-01-01"
                      id="date"
                      name="date"
                      value={date.toString()}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </>
                )}
                <br/>
                <label htmlFor="status">Status:</label>
                <Status onChange={handleStatusChange} value={status} />
                <br />
                <label htmlFor="genre">Genre:</label>
                <Genre onChange={handleGenreChange} value={genre} />
                <br />
                <label htmlFor="rating">Rating:</label>
                <Rating value={rating} onChange={setRating} defaultValue={rating}/>
                <br />
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
          <div className="description">
            <h4 className="description">{item.volumeInfo.description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
