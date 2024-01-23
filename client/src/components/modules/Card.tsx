import React, { useState } from "react";
import Modal from "./Modal";
const Card = ({ book }) => {

    const [show,setShow]=useState<boolean>(false);
    const [bookItem,setItem]=useState();
    return (
        <div>
            {
                book.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    if(thumbnail!= undefined)
                    {
                        return (
                            <div>
                            <div className="card" onClick={()=>{setShow(true);setItem(item)}}>
                                <img src={thumbnail} alt="" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <h3 className="title">{item.volumeInfo.authors}</h3>
                                </div>
                            </div>
                              <Modal show={show} item={bookItem} onClose={()=>setShow(false)}/>
                            </div>
                        )
                    }
                    
                })
            }

        </div>
    )
}
export default Card;