import React, { Component } from "react";

const NewItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div>
      <div className="card my-2" style={{ display: "table", height: "25rem" }}>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://img.huffingtonpost.com/asset/64304f31280000730084b060.jpeg?cache=d9seyzK5Pq&ops=1200_630"
          }
          className="card-img-top"
          alt="..."
          style={{ display: "table-row", maxHeight: "45%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {date}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewItem;
