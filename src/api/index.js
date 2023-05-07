import axios from 'axios';

export const getTopHeadlineRequest = async params => {
  const endpoint = `https://api.themoviedb.org/3/movie/${'top_rated'}?api_key=a531b8aedefc4f260e0a74e88e6f86a0&language=en-US&page=1`;
  var res = null;
  res = await axios.get(endpoint);
  return res.data.results;
};
