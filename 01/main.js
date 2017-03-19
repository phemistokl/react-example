const CardApp = React.createClass({
  getInitialState() {
    return {
      isToggle: true
    };
  },

  toggleBox(event) {
    this.setState({
      isToggle: !this.state.isToggle
    });
  },

  render() {
    return (
      <div className="main-box">
        <div className={`box ${ this.state.isToggle ? 'active' : ' ' }`} onClick={this.toggleBox}>
          <img src="image.jpg" />
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <CardApp />,
  document.getElementById('root')
);
