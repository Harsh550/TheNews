import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  const updateNews = async () => {
    props.setProgress(10);

    // Updated fetch URL pointing to your backend/serverless function
    const url = `/api/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);

    try {
      let response = await fetch(url);
      props.setProgress(30);

      let parsedData = await response.json();
      props.setProgress(70);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching the news:", error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
  }, []); // Add dependencies if needed

  const fetchMoreData = async () => {
    setPage(page + 1);

    // Updated fetch URL pointing to your backend/serverless function
    const url = `/api/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

    try {
      let response = await fetch(url);
      let parsedData = await response.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        News Monkey - {props.category}
      </h1>
      {loading && <Spinner />}
      {articles && (
        <InfiniteScroll
          className="container "
          style={{ overflow: "hidden" }}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner />}
        >
          <div className="container text-center">
            <div className="row">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-3 mb-4" key={index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 50) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
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
