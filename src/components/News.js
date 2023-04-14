import React, { Component } from "react";
import Newitem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  toUpper = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.toUpper(this.props.category)} Headlines
        </h1>
        <div className="row my-4">
          {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state}
          loader={<h4>Loading...</h4>}
        /> */}
          {this.state.loading && <Spinner />}
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3 my-2" key={element.url}>
                  <Newitem
                    title={
                      element.title ? String(element.title).slice(0, 60) : ""
                    }
                    description={
                      element.description
                        ? String(element.description).slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={new Date(element.publishedAt).toGMTString()}
                  />
                </div>
              );
            })}
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePreviousClick}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
