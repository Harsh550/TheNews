import React, { useEffect, useLayoutEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


// import loog from './image/loog.png';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoadDone, setInitialLoadDone] = useState(false);


  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "genreal",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

   

  const updateNews = async () => {
    props.setProgress(10);
  
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(props.apiKey)}&categories=${encodeURIComponent('general')}&search=${encodeURIComponent(props.country)}&limit=3&page=1`;
  
    setLoading(true);
  
    try {
      let response = await fetch(url);
      props.setProgress(30);
  
      let parsedData = await response.json();
      props.setProgress(70);
  
      // Update articles with parsedData.data, not parsedData.articles
      setArticles(parsedData.data); 
      setTotalResults(parsedData.meta.found); // total results are in parsedData.meta.found
  
      setLoading(false);
      props.setProgress(100);
    } 
    catch (error) {
      console.error('Error fetching the news:', error);
      setLoading(false);
      props.setProgress(100);
    }
  };
  
  useEffect(() => {
    updateNews(); 
  }, [props.category, props.country]);
  
  
  const fetchMoreData = async () => {  
    setLoading(true);
    const nextPage = page + 1; 
    setPage(nextPage);
  
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(props.apiKey)}&categories=${encodeURIComponent('general')}&search=${encodeURIComponent(props.country)}&limit=3&page=${nextPage}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
  
    // Concatenate with parsedData.data, not parsedData.articles
    setArticles(articles.concat(parsedData.data)); 
    setTotalResults(parsedData.meta.found); // total results are in parsedData.meta.found
    setLoading(false);
  };
  
  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        News Monkey - {props.category.charAt(0).toUpperCase() + props.category.slice(1)} {/* Displaying the selected category */}
      </h1>
      {loading && page === 1 && <Spinner />}
      {articles && (
      <InfiniteScroll
        className="container"
        style={{ overflow: "hidden" }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={loading && <Spinner />}
        scrollThreshold={0.8}
      >
        <div className="container text-center">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 80) : ""}
                    imageUrl={element.image_url ? element.image_url : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.published_at}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      )}
    </>
  );
  
        
  
};

// ??????????????????????????????????????????????????????????????????????????????????????????????????
{
  /* {!this.state.loading && this.state.articles?.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 60) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 100)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date= {element.publishedAt}
                    source= {element.source.name}
            
                  />
                  
                </div>
              )}
            )} */
}

export default News;
