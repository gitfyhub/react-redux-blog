import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // refactored the above commented code
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id=> dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch)
// };

// const _fetchUser = _.memoize(async(id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// refactor of above lines 9 -16
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch)
// const _fetchUser = _.memoize(async(id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// this code works also using memoize - came up with this as a replacement to the above
// export const fetchUser = _.memoize(function(id) {
//   return _.memoize(async function(dispatch) {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: "FETCH_USER", payload: response.data });
//   });
// });
