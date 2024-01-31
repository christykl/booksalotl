import React from "react";

const Genre = ({ onChange, value }) => {
  return (
    <select name="genre" id="genre" value={value} onChange={onChange}>
      <option value="action">Action</option>
      <option value="adventure">Adventure</option>
      <option value="biography">Biography</option>
      <option value="business">Business</option>
      <option value="children">Children's Literature</option>
      <option value="classics">Classics</option>  
      <option value="comedy">Comedy</option>
      <option value="crime">True Crime</option>
      <option value="drama">Drama</option>
      <option value="dystopian">Dystopian</option>
      <option value="fantasy">Fantasy</option>
      <option value="fiction">Fiction</option>
      <option value="graphic novel">Graphic Novel</option>
      <option value="history">History</option>
      <option value="historical fiction">Historical Fiction</option>  
      <option value="horror">Horror</option> 
      <option value="lgbtq">LGBTQ</option> 
      <option value="magical realism">Magical Realism</option>  
      <option value="memoir">Memoir</option>  
      <option value="mystery">Mystery</option>
      <option value="non-fiction">Non-Fiction</option>
      <option value="philosophy">Philosophy</option>
      <option value="poetry">Poetry</option>  
      <option value="politics">Politics</option>
      <option value="psychology">Psychology</option>
      <option value="religion">Religion and Spirituality</option>  
      <option value="romance">Romance</option>
      <option value="satire">Satire</option>
      <option value="science">Science</option>
      <option value="science fiction">Science Fiction</option>
      <option value="self help">Self Help</option>
      <option value="speculative">Speculative</option>
      <option value="sports">Sports</option>
      <option value="thriller">Thriller</option>
      <option value="ya">Young Adult</option>
    </select>
  )
}

export default Genre;