import {useEffect, useState} from "react";
import getTrendingMovieIDs from "../hooks/getTrendingMovieIDs";
import getDiscoverMovieIDs from "../hooks/getDiscoverMovieIDs";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { MovieFlexbox } from "../components/MovieFlexbox";

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
        </div>
    )
}

export default Movies