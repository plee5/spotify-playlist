import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.token = "BQC20J_nHSQBbIKMQYbwNy89iP-MzACEQPsgUhppx_aK85jPYKigdkBJvgbMJD0-ME-thqf8F86q9nQa1CKSZP_8F42ttq25uoFXZ_PfasNJz6rk4VzX4tOnfo4Q-q6AJ9fpN4_57n9NcA";
        this.state = {
            query: "",
            people: []
        };
    }
    onChange = e => {
        alert("hello");
      const { value } = e.target;
      this.setState({
        query: value
      });
    };

    keyPress = e => {
        e.preventDefault();
        alert("hellooooo");
        if(e.keyCode == 13){
            console.log('value', e.target.value);
            this.search(e.target.value);
         }
      };
  
    search = query => {
        const token = "BQC20J_nHSQBbIKMQYbwNy89iP-MzACEQPsgUhppx_aK85jPYKigdkBJvgbMJD0-ME-thqf8F86q9nQa1CKSZP_8F42ttq25uoFXZ_PfasNJz6rk4VzX4tOnfo4Q-q6AJ9fpN4_57n9NcA";
        const url = 'https://api.spotify.com/v1/search?access_token='+token+'&query='+query+'&type=track&limit=1';
        fetch(url)
            .then(results => results.json())
            .then(data => {
                this.setState({ people: data.tracks });
                console.log(data.tracks);
            });
        
    };
  
    // componentDidMount() {
    //   this.search("");
    // }
  
    render() {
      return (
        <form>
          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.onChange}
            onSubmit={this.keyPress}
          />

          {/* {this.state.people.map(person => (
            <ul key={person.name}>
              <li>{person.name}</li>
            </ul>
          ))} */}
        </form>
      );
    }
  }

  export default Search;