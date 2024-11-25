import {useEffect, useState} from "react";
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { MovieFlexbox } from "../components/MovieFlexbox";

const TRENDING_URL = `http://localhost:3333/movies/trending`
const DISCOVER_URL = `http://localhost:3333/movies/discover`

function Movies() {

    const [trendingMovieIdList, setTrendingMovieIdList] = useState([])
    const [discoverMovieIdList, setDiscoverMovieIdList] = useState([])

    const getMovieIdLists = ()=>{
        axios.get(TRENDING_URL)
        .then(response => response.data.results)
        .then(results => results.map(movie => movie.id))
        .then(ids => setTrendingMovieIdList(ids))

        axios.get(DISCOVER_URL)
        .then(response => response.data.results)
        .then(results => results.map(movie => movie.id))
        .then(ids => setDiscoverMovieIdList(ids))
    }

    useEffect(() => {
        getMovieIdLists()
    }, [])

    return (
        <div className="movies-background">
            <Tabs className="text-white">
                <TabList>
                    <Tab>Trending</Tab>
                    <Tab>Discover</Tab>
                </TabList>
                <TabPanel>
                    <MovieFlexbox movieIdList={trendingMovieIdList}></MovieFlexbox>
                </TabPanel>
                <TabPanel>
                    <MovieFlexbox movieIdList={discoverMovieIdList}></MovieFlexbox>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Movies