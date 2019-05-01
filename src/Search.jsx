import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.token = "BQCg4IKlmx5FC0EuCCW6_hW9hbrCwcQLTdbT4hbLDd2G-P1FRGt_zLWExNDWOVFPhg09sDGmwVlJho9-4pmwwUYXaTz8ctVv9LPZGWsdZxqf_0uQhxE3oocone-x4Uw0F__gmjuoSqICAbq1FmcytZYEkjwcU36S3Q";
        this.state = {
            query: "",
            people: []
        };
    }
    onChange = e => {
      const { value } = e.target;
      this.setState({
        query: value
      });
    };

    keyPress = e => {
        e.preventDefault();
          console.log('value',this.state.query);
          this.search(this.state.query);
      };
  
    search = query => {
        const token = "BQCg4IKlmx5FC0EuCCW6_hW9hbrCwcQLTdbT4hbLDd2G-P1FRGt_zLWExNDWOVFPhg09sDGmwVlJho9-4pmwwUYXaTz8ctVv9LPZGWsdZxqf_0uQhxE3oocone-x4Uw0F__gmjuoSqICAbq1FmcytZYEkjwcU36S3Q";
        const url = 'https://api.spotify.com/v1/search?access_token='+token+'&query='+query+'&type=track&limit=1';
        console.log(url);
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
        <form
          onSubmit={this.keyPress}
        >

          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.onChange}
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