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

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&from=2023-04-07&to=2023-04-07&sortBy=popularity&apiKey=9e0529bf5a8b445298e1c71c340ebc27&page=1`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log("next");
    window.scrollTo(0, 0);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&pageSize=${this.props.pageSize}
    &from=2023-04-07&to=2023-04-07&sortBy=popularity&apiKey=9e0529bf5a8b445298e1c71c340ebc27&page=${
      this.state.page + 1
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handlePreviousClick = async () => {
    window.scrollTo(0, 0);
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&pageSize=${
      this.props.pageSize
    }&from=2023-04-07&to=2023-04-07&sortBy=popularity&apiKey=9e0529bf5a8b445298e1c71c340ebc27&page=${
      this.state.page - 1
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: true,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.toUpper(this.props.category)} Headlines
        </h1>
        <div className="row my-4">
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
