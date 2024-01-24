import React from 'react';
const Modal=({show,item,onClose})=>{
    if(!show)
    {
        return null;
    }
    let thumbnail=item.cover;
    return(
        <div>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}>Close</button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.title}</h1>
                            <h3>{item.authors}</h3>
                            <h4>{item.publisher}<span>{item.published_date}</span></h4><br/>
                            <a href={item.preview_link}><button>More</button></a>
                        </div>
                    </div>
                    <h4 className="description">{item.description}</h4>
                </div>
            </div>
        </div>
    )
}
export default Modal;