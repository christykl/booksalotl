import React from "react";

const Genre = ({ onChange, value }) => {
  return (
    <select name="genre" id="genre" value={value} onChange={onChange}>
      <option value="action">Action</option>
      <option value="adventure">Adventure</option>
      <option value="comedy">Comedy</option>
      <option value="crime">Crime</option>
      <option value="drama">Drama</option>
      <option value="fantasy">Fantasy</option>
      <option value="fiction">Fiction</option>
      <option value="historical">Historical</option>
      <option value="historical fiction">Historical Fiction</option>  
      <option value="horror">Horror</option>  
      <option value="magical realism">Magical Realism</option>  
      <option value="mystery">Mystery</option>
      <option value="non-fiction">Non-Fiction</option>
      <option value="paranormal">Paranormal</option>
      <option value="philosophical">Philosophical</option>
      <option value="political">Political</option>
      <option value="romance">Romance</option>
      <option value="satire">Satire</option>
      <option value="science fiction">Science Fiction</option>
      <option value="social">Social</option>
      <option value="speculative">Speculative</option>
      <option value="thriller">Thriller</option>
      <option value="urban">Urban</option>
      <option value="western">Western</option>
    </select>
  )
}

export default Genre;