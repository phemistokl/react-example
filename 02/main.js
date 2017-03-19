const GameApp = React.createClass({
   getInitialState() {

     return {
       size: 20,
       top: 120
     };

   },

   toggleBox() {
     this.setState({
       size: this.state.size + 4,
       top: this.state.top - 2
     })

     if( this.state.size > 100 ) {
       this.restartSize();
     }
   },

   restartSize() {
     this.setState({
       size: 20,
       top: 120
     })
   },

   render() {
     const style = { width: this.state.size + 'px', height: this.state.size + 'px', marginTop: this.state.top + 'px' };
     
     return (
       <div className="main-box" onClick={this.toggleBox} style={ style }>
       </div>
     )

   }
});

ReactDOM.render(
   <GameApp />,
   document.getElementById('root')
);
