import React from "react";

const Status = ({ onChange, value }) => {
  return (
    <select name="status" id="status" value={value} onChange={onChange}>
      <option value="read">Read</option>
      <option value="currently reading">Currently Reading</option>
      <option value="want to read">Want to Read</option>
    </select>
  )
}

export default Status;