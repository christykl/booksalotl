//popup for inputting book info such as date read, genre, and rating

import React, { useState } from "react";


const BookInfo = ({ item, onClose, datecb, ratingcb, genrecb, addbook, dropdowncb }) => {
  let thumbnail =
    item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let today = new Date();
  const [genre, setGenre] = useState<string>(""); 
  const [date, setDate] = useState<string>(today.toString());
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    datecb(Date.parse(date)); // Update date in parent component
    genrecb(genre); // Update genre in parent component
    ratingcb(rating); // Update rating in parent component
    dropdowncb(); // Close the dropdown
    addbook(item); // Add the book to the library
  }

  return (
    <div>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>X</button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
            <h1>{item.volumeInfo.title}</h1>
               <h3>{item.volumeInfo.authors}</h3>
               <h5>
                 {item.volumeInfo.publisher}
                 <span>{item.volumeInfo.published_date}</span>
               </h5>
               <br />
              {/* ... Other info elements ... */}
              <form onSubmit={handleSubmit}>
                <input type="date" id="date" name="date" value={date.toString()} onChange={(e) => setDate(e.target.value)}/>
                <input type="text" id="genre" name="genre" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
                <input type="number" id="rating" name="rating" placeholder="Rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}/>  
                <button type="submit">Add Book</button>
              </form>
            </div>
          </div>
          <div className="description">
            <h4 className="description">{item.volumeInfo.description}</h4>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BookInfo;


// //item is a googlebooks type book. need volumeinfos
// const BookInfo = ({ item, onClose, datecb, ratingcb, genrecb, addbook, dropdowncb}) => {
//   let thumbnail =
//     item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
//   const [genre, setGenre] = useState<string>(""); 
//   const [date, setDate] = useState<Date>(new Date());
//   const [rating, setRating] = useState<number>(0);

//   const handleDate = (event) => {
//     setDate(event.target.value);
//     datecb(date);
//   }

//   const handleGenre = (event) => {
//     setGenre(event.target.value);
//     genrecb(genre);
//   } 

//   const handleRating = (event) => { 
//     setRating(event.target.value);
//     ratingcb(rating);
//   } 

//   return (
//     <div>
//       <div className="overlay">
//         <div className="overlay-inner">
//           <button className="close" onClick={onClose}>
//             X
//           </button>
//           <div className="inner-box">
//             <img src={thumbnail} alt="" />
//             <div className="info">
//               <h1>{item.volumeInfo.title}</h1>
//               <h3>{item.volumeInfo.authors}</h3>
//               <h5>
//                 {item.volumeInfo.publisher}
//                 <span>{item.volumeInfo.published_date}</span>
//               </h5>
//               <br />
//               {/* <a href={item.preview_link}>
//                 <button>More</button>
//               </a> */}
//               <form>
//                 <input type="date" id="date" name="date" value={date.toString()} onChange={handleDate}/>
//                 <input type="text" id="genre" name="genre" placeholder="Genre" value={genre} onChange={handleGenre}/>
//                 <input type="text" id="rating" name="rating" placeholder="Rating" value={rating} onChange={handleRating}/>  
//                 <button type="submit" onClick={() => {
//                   dropdowncb();
//                   addbook(item);
//                 }
//                   }> add book </button>
//               </form>
//             </div>
//           </div>
//           <div className="description">
//             <h4 className="description">{item.volumeInfo.description}</h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default BookInfo;