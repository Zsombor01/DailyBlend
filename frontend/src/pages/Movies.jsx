import {useEffect, useState} from "react";
import getTrendingMovieIDs from "../hooks/movies/getTrendingMovieIDs";
import getDiscoverMovieIDs from "../hooks/movies/getDiscoverMovieIDs";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { MovieFlexbox } from "../components/MovieFlexbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Movies() {
    
    const [trendingMovieIDList, setTrendingMovieIDList] = useState([])
    const [discoverMovieIDList, setDiscoverMovieIDList] = useState([])


    const getMovieIDLists = async ()=>{
        const trendingIDs = await getTrendingMovieIDs();
        setTrendingMovieIDList(trendingIDs);

        const discoverIDs = await getDiscoverMovieIDs();
        setDiscoverMovieIDList(discoverIDs);
    }

    useEffect(() => {
        getMovieIDLists()
    }, [])

    return (
        <div className="movies-background">
            <h1>Movies</h1>
            <Tabs>
                <TabList>
                    <Tab>Trending</Tab>
                    <Tab>Discover</Tab>
                </TabList>
                <TabPanel>
                    <MovieFlexbox movieIdList={trendingMovieIDList}></MovieFlexbox>
                </TabPanel>
                <TabPanel>
                    <MovieFlexbox movieIdList={discoverMovieIDList}></MovieFlexbox>
                </TabPanel>
            </Tabs>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </div>
    )
}

export default Movies