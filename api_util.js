export const getPhotos = (lat, lng, dist, token) => (
  $.ajax({
    method: "GET",
    url: `https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&distance=${dist}&access_token=${token}`,
    dataType: 'jsonP'
  })
);
