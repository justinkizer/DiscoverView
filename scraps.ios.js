fetchMultipleLocationsMedia(idsArray){
  console.log('got here at least!');
  idsArray.forEach(id => {
    this.fetchLocationMedia(id);
  });
  console.log(this.state.locationMedia);
}

fetchLocationMedia(id){
  fetch(`https://api.instagram.com/v1/locations/${id}/media/recent?access_token=${this.state.accessToken}`)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        locationMedia: this.state.locationMedia.concat(responseData.data)
      });
    });
}
