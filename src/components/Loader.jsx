import React from 'react';


/**
 * 
 * Here I am simply using font-awesome icons library
 * to create a Loader component using loading spinner.
 * and rendering it in the Gif component wherever needed.
 */
const Loader = () => {
    return (
    <div className="loader text-center">
        <i className="fas fa-spinner fa-8x fa-spin"></i>
        <h3>Please wait while we load some amazing gifs for you...</h3>
    </div>
    )
}

export default Loader;