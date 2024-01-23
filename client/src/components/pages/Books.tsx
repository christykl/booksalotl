import React, { useState, useEffect } from "react";
import SingleBook from "../modules/SingleBook";
import FileUpload from "../modules/FileUpload";
import axios from "axios";

export type Book = {
  _id: string;
  title: string;
  author: string;
  bookCover?: string;
  rating?: number;
};

type BooksProps = {
  userId: string;
};

const Books = (props: BooksProps) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [search,setSearch]=useState<string>("");
  const searchBook=(evt)=>{
    if(evt.key==="Enter")
    {
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDjnJHbxfCAqhtxJr1YYzleaQGQB8MdbEA'+'&maxResults=10')
        .then(res=>setBookData(res.data.items))
        .catch(err=>console.log(err))
    }
}

  const loadBooks = () => {
    setBookData([
      {_id: "1", title: "1984", author: "George Orwell"},
      {_id: "2", title: "Pride and Prejudice", author: "Jane Austen"},
      {_id: "3", title: "Thinking, Fast and Slow", author: "Daniel Kahneman"},
    ]);
  }

  useEffect(loadBooks, []);

  return <>
    <div className="Books-searchContainer">
      <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} onKeyUp={searchBook} />
      <button type="button">Search</button>
    </div>
    <div className="Books-searchContainer">
      <FileUpload />
    </div>
    {bookData.map((item) => {
      return <SingleBook key={item._id} userId={props.userId} book={item}/>
    })}  
  </>

};

export default Books;