const MarkdownPreview = React.createClass({
  rawMarkup(value) {
    var md = new Remarkable();

    return { __html: md.render(value) };
  },

  render() {

    const {
      value
    } = this.props;

    return (
      <div className="preview" dangerouslySetInnerHTML={this.rawMarkup(value)}>
      </div>
    );
  }
});

const BlogArticle = React.createClass({
  render() {

    const {
      title,
      value
    } = this.props;

    return (
      <div className="blog">
        <h2>{title}</h2>
        <MarkdownPreview value={value} />
      </div>
    );
  }
});

const BlogForm = React.createClass({
  getInitialState() {

    return {
      title: '',
      value: ''
    };
  },

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  },

  handleTextChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  handleBlogAdd() {
    const newBlog = {
      title: this.state.title,
      value: this.state.value,
      id: Date.now()
    };

    this.props.onBlogAdd(newBlog);
    this.setState({ value: '', title: '' });
  },

  render() {

    return (
      <div className="blog-form">
        <input
          type="text"
          className="title"
          placeholder="Заголовок..."
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          className="textarea"
          onChange={this.handleTextChange}
          placeholder="Текст..."
          value={this.state.value}
       />
        <button
          className="add-button"
          disabled={!this.state.value}
          onClick={this.handleBlogAdd}
        >
          Опубликовать
        </button>
        <MarkdownPreview value={this.state.value} />
      </div>
    );
  }
});

const BlogGrid = React.createClass({
  render() {

    return (
      <div className="blog-grid">
        {
          this.props.blogs.map(blog =>
            <BlogArticle
              key={blog.id}
              title={blog.title}
              value={blog.value}
            />
          )
        }
      </div>
    );
  }
});

const BlogApp = React.createClass({
  getInitialState() {
    const localBlogs = JSON.parse(localStorage.getItem('blogs'));

    return {
      blogs: localBlogs ? localBlogs : []
    };
  },

  componentDidMount() {

    if (localBlogs) {
      this.setState({ blogs: localBlogs });
    }
  },

  componentDidUpdate() {
    const blogs = JSON.stringify(this.state.blogs);

    localStorage.setItem('blogs', blogs);
  },

  handleBlogAdd(newBlog) {
    const newBlogs = this.state.blogs.slice();

    newBlogs.unshift(newBlog);
    this.setState({ blogs: newBlogs });
  },

  render() {

    return (
      <div className="blog-app">
        <h1 className="app-header">Blog app</h1>
        <BlogForm onBlogAdd={this.handleBlogAdd} />
        <BlogGrid blogs={this.state.blogs} />
      </div>
    );
  }
});

ReactDOM.render(
  <BlogApp />,
  document.getElementById('root')
);
