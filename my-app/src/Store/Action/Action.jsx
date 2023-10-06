const EDIT_DATA = "EDIT_DATA";
export const addData = (values) => ({
  type: "ADD_DATA",
  payload: values,
});
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const editData = (data, index) => {
  return {
    type: "EDIT_DATA",
    payload: { data, index },
  };
};
export const setEditedUser = (user) => ({
  type: "SET_EDITED_USER",
  payload: user,
});
export const deleteData = (index) => ({
  type: "DELETE_DATA",
  payload: index,
});
export const cancelData = () => ({
  type: "CANCEL_DATA",
});
