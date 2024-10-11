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
    
    setLoading(true);

    try {
      // Fetch 6 articles on first load (2 pages of 3 articles each)
      const url1 = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(props.apiKey)}&language=en&limit=3&page=1&categories=${encodeURIComponent(props.category)}`;

      const url2 = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(props.apiKey)}&language=en&limit=3&page=2&categories=${encodeURIComponent(props.category)}`;

      // First API request for 3 articles
      let response1 = await fetch(url1);
      props.setProgress(30);
      let parsedData1 = await response1.json();
      props.setProgress(50);

      // Second API request for 3 more articles
      let response2 = await fetch(url2);
      let parsedData2 = await response2.json();
      props.setProgress(70);

      // Combine both responses and update the state
      setArticles([...parsedData1.data, ...parsedData2.data]);
      setTotalResults(parsedData1.meta.found); // Assuming both have the same total results

      setLoading(false);
      props.setProgress(100);
      console.log(parsedData1.data);
      console.log(parsedData2.data);
    } catch (error) {
      console.error("Error fetching the news:", error);
      setLoading(false);
      props.setProgress(100);
      

    }
  };

  useEffect(() => {
    updateNews();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.country]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // Fetch 3 more articles
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(
      props.apiKey)}&language=en&limit=3&page=${nextPage}&categories=${encodeURIComponent(props.category)}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.data));
    setTotalResults(parsedData.meta.found);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        News Monkey - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
      </h1>

      {loading && page === 1 && <Spinner />}

      <InfiniteScroll
        className="container"
        style={{ overflow: "hidden" }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
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
    </>
  );
};
export default News;
