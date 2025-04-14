import React, { useEffect, useState, useRef } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const alreadyFetched = useRef(false);

  News.defaultProps = {
    country: "in",
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
      const url1 = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(
        props.apiKey
      )}&language=en&limit=3&page=1&categories=${encodeURIComponent(
        props.category
      )}`;

      const url2 = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(
        props.apiKey
      )}&language=en&limit=3&page=2&categories=${encodeURIComponent(
        props.category
      )}`;

      let response1 = await fetch(url1);
      props.setProgress(30);
      let parsedData1 = await response1.json();
      props.setProgress(50);

      let response2 = await fetch(url2);
      let parsedData2 = await response2.json();
      props.setProgress(70);

      // Combine and deduplicate articles
      const combinedArticles = [...parsedData1.data, ...parsedData2.data].filter(
        (article, index, self) =>
          index === self.findIndex((a) => a.url === article.url)
      );

      setArticles(combinedArticles);
      setTotalResults(parsedData1.meta.found);
      setPage(2);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching the news:", error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!alreadyFetched.current) {
        alreadyFetched.current = true;
        await updateNews();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.country]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(
      props.apiKey
    )}&language=en&limit=3&page=${nextPage}&categories=${encodeURIComponent(
      props.category
    )}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    const newArticles = parsedData.data.filter(
      (newArticle) =>
        !articles.some((existing) => existing.url === newArticle.url)
    );

    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setTotalResults(parsedData.meta.found);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        News - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
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
            {articles.map((element, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  imageUrl={
                    element.image_url
                      ? element.image_url
                      : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={element.published_at}
                  source={element.source}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
