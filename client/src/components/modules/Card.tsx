import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.css"
const Card = ({ book }) => {

    const [show,setShow]=useState<boolean>(false);
    const [bookItem,setItem]=useState();

		let thumbnail=book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
		if(thumbnail!= undefined)
		{
			return (
				<div>
				<div className="card" onClick={()=>{setShow(true);setItem(book)}}>
						<img src={thumbnail} alt="" />
						<div className="bottom">
							<h3 className="title">{book.volumeInfo.title}</h3>
							<h3 className="title">{book.volumeInfo.authors}</h3>
						</div>
				</div>
					<Modal show={show} item={bookItem} onClose={()=>setShow(false)}/>
				</div>
			)
		}
		else {
			return (
				<div>
					no thumbnail
				</div>
			)
		}
							
					
}
export default Card;