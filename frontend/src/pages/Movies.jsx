import {useEffect, useState} from "react";
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { MovieFlexbox } from "../components/MovieFlexbox";

const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day' + API_KEY
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie' + API_KEY
const POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular' + API_KEY

function Movies() {

    const [trendingMovieIdList, setTrendingMovieIdList] = useState([])
    const [discoverMovieIdList, setDiscoverMovieIdList] = useState([])
    const [popularMovieIdListm, setPopularMovieIdList] = useState([])

    const getMovieIdLists = ()=>{
        axios.get(TRENDING_URL)
        .then(response => response.data.results)
        .then(results => results.map(movie => movie.id))
        .then(ids => setTrendingMovieIdList(ids))

        axios.get(DISCOVER_URL)
        .then(response => response.data.results)
        .then(results => results.map(movie => movie.id))
        .then(ids => setDiscoverMovieIdList(ids))

        axios.get(POPULAR_URL)
        .then(response => response.data.results)
        .then(results => results.map(movie => movie.id))
        .then(ids => setPopularMovieIdList(ids))
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
                    <Tab>Popular</Tab>
                </TabList>
                <TabPanel>
                    <MovieFlexbox movieIdList={trendingMovieIdList}></MovieFlexbox>
                </TabPanel>
                <TabPanel>
                    <MovieFlexbox movieIdList={discoverMovieIdList}></MovieFlexbox>
                </TabPanel>
                <TabPanel>
                    <MovieFlexbox movieIdList={popularMovieIdListm}></MovieFlexbox>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Movies