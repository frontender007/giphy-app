import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios';

import Loader from './Loader';

const Gif = () => {

    //state hooks
    const [gifs, setGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [query, setQuery] = useState("");
    
    /** using effect hook with axios to make
     * calls to giphy api. If there is an error I am using an self destructing 
     * alert to let user know what happend
     * otherwise loading spinner is shown until
     * the data is returned and shown.
    */ 
    useEffect ( () => {
        const getGifs = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    //using api key as a string rather than env file for testing purpose.
                    api_key: "IggGghGLeJjTZ77naApETTp3AhGPjPOt",
                    limit: 48
                }
                });
                setGifs(result.data.data);
            } catch (error) {
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
            }
            setIsLoading(false);
        }
        setTimeout(getGifs, 1500);
    }, []);

    /**
     * renderGifs method first checks to see if 
     * the isLoading state is set to true
     * if so the loading componenet is rendered
     * if not then it renders gifs returned by 
     * the the fetch api call. 
     */
    const renderGifs = () => {
        if (isLoading) {
            return (
                <div className="main-container">
                    <Loader />
                </div>
            )
        }
        return gifs.map(gif => {
            return (
                
                <div
                    key={gif.id}
                    className="col-lg-2 col-md-3 col-sm-4 justify-content-center text-center gif"
                    >
                        <img style={{ marginRight: "0px", width: "200px", height: "200px"}} className="img-responsive bordered" src={gif.images.fixed_height.url} alt={gif.title} />
                </div>
                
            );
        });
    }

    /** 
     * In renderError method if the isError state is set to true
     * then I am alerting the user that there has been an issue to fetch the data
     * and they should try again.
    */
    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger" role="alert">
                    Problem getting gifs, please try again in a bit.
                </div>
            )
        }
    }

    //making the input/search field a controlled input
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }



    /** 
     * I am doing a similar api calls to fetch gifs 
     * but this time the gifs are being searched with whatever 
     * user types in the search box. Resulting gifs/images are being 
     * used to set the initial state of gifs. And eventually renderd on the page
    */

    const handleSearch = (e) => {
        e.preventDefault();
        const fetchGifs = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "IggGghGLeJjTZ77naApETTp3AhGPjPOt",
                    q: query,
                    limit: 48
                }
                });
                setGifs(result.data.data);
            } catch (error) {
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
            }
            setIsLoading(false);
        }
        if (query === '') {
            alert("Please enter a value to search gifs");
        } else {
            fetchGifs();
        }
        setQuery("");
    }

    return (
        <div className="container-fluid app">
            {renderError()}
            <div className="row">
                <header className="text-center">
                    <h1 className="text-center">Giphygram</h1>
                    <form onSubmit={handleSearch} className="form-inline justify-content-center m-2">
                        <input value={query} onChange={handleInputChange} type="text" className="form-control searchBox" placeholder="Search"/>
                        <button className="btn btn-dark searchBtn">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </header>
            </div>

            <div className="row">
                {renderGifs()}
            </div>

        </div>
    )
}

export default Gif;