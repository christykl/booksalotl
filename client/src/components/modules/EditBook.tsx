//popup for inputting book info such as date read, genre, and rating

import React, { useEffect, useState } from "react";
import Genre from "./Genre";
import { Rating } from "@mantine/core";
import Status from "./Status";

const EditBook = ({ item, onClose, datecb, ratingcb, genrecb, updatebook, statuscb }) => {
  let thumbnail = item.cover;
    // item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let today = new Date();
  const [genre, setGenre] = useState<string>(item.genre || ""); 
  const [date, setDate] = useState<string>(item.dateread ? item.dateread.toString() : new Date().toString());
  const [rating, setRating] = useState<number>(item.rating || 0);
  const [status, setStatus] = useState<string>(item.status || "read");
  const [submit, setSubmit] = useState<boolean>(false); 


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create an object with updated book data
    const updatedBookData = {
      ...item,
      dateread: date,
      rating: rating,
      genre: genre,
      status: status
    };

    updatebook(updatedBookData); // Update the book with new data
    onClose(); // Close the edit book popup
  }
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
          <button className="close" onClick={onClose}>X</button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
            <h2>{item.title}</h2>
               <h3>{item.authors}</h3>
               <h5>
                 {item.publisher + ' '}
                 <span>{item.published_date}</span>
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
                      value={date.split('T')[0]} // Ensure format is compatible with input type=date
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </>
                )}
                <br/>
                <label htmlFor="status">Status:</label>
                <Status onChange={handleStatusChange} value={status} />
                <br/>
                <label htmlFor="genre">Genre:</label>
                <Genre onChange={handleGenreChange} value={genre} />
                <br/>
                <label htmlFor="rating">Rating:</label>
                <Rating value={rating} onChange={setRating} defaultValue={rating}/>
                <br/>
                <button type="submit">Update Book</button>
              </form>
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

export default EditBook;
