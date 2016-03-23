var Gifs = React.createClass({

  getInitialState(){
    return {
      gifs: []
    }
  },

  componentWillMount(){
    this.fetchGifs("Taylor Swift");
  },

  fetchGifs(searchText){
    var component = this;
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=dc6zaTOxFJmzC";
    fetch(url).then(function(response){
      return response.json();
    }).then(function(json){

      component.setState({
        "gifs": json.data
      })

    })
  },

  searchIt(event){
    // Stop the form from submitting.
    // I'll do it myself
    event.preventDefault();
    // Get the vlaue of what is in the input with ref of searchtext
    var searchText = this.refs.searchtext.value;
    this.fetchGifs(searchText)
  },

  render() {
    return <div>
      <div>
        <form onSubmit={this.searchIt}>
        <input type="text" ref="searchtext" defaultValue="Taylor Swift"/>
        <button>Search</button>
        </form>
      </div>
      {this.state.gifs.map(function(gif){
        return <img key={gif.id} src={gif.images.fixed_height.url}/>
      })}
    </div>;
  }
});
