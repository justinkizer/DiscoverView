import React from 'react';

class ResultsItem extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <img src={this.props.url} />
      </div>
    );
  }
}

export default ResultsItem;
