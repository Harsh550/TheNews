import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="card h-100">  {/* Added `h-100` class */}
    <div style={{ display: "flex", position: "absolute", right: "0" }}>
      <span className="badge rounded-pill bg-danger">{source}</span>
    </div>
    <img src={imageUrl} className="card-img-top" alt="..." style={{ width: "100%", height: "200px", objectFit: "cover" }}/>
    <div className="card-body d-flex flex-column"> {/* Added `d-flex flex-column` classes */}
      <h5 className="card-title">{title}....</h5>
      <p className="card-text">
        {!description ? "not available click on read more to read full article" : description}
      </p>
      <div className="mt-auto"> {/* Ensures footer sticks to the bottom */}
        <small className="text-muted">
          By {!author ? "unknown" : author} on{" "}
          {new Date(date).toUTCString()}
        </small>
      </div>
    </div>
    <div className="card-footer">
      <a
        rel="noreferrer"
        href={newsUrl}
        target="_blank"
        className="btn btn-sm btn-dark"
      >
        Read more
      </a>
    </div>
  </div>
);
};

export default NewsItem;
