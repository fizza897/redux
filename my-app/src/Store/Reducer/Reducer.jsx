const initialState = {
  dataSource: [],
  editingIndex: null,
  formData: null,
  editedUser: null,
  searchQuery: "",
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      console.log("action.payload.........", action.payload);
      return {
        ...state,
        dataSource: [...state.dataSource, action.payload],
      };
      case 'EDIT_DATA':
        const { data, index } = action.payload;
        const updatedDataSource1 = [...state.dataSource];
        updatedDataSource1[index] = data;
      
        return {
          ...state,
          dataSource: updatedDataSource1,
          editingIndex: null,
        };
        case 'SET_EDITED_USER':
            return {
              ...state,
              editedUser: action.payload,
            };
    case "DELETE_DATA":
      const deletedUserIndex = action.payload;
      const updatedDataSource = [...state.dataSource];

      if (
        deletedUserIndex >= 0 &&
        deletedUserIndex < updatedDataSource.length
      ) {
        updatedDataSource.splice(deletedUserIndex, 1);
      }

      return {
        ...state,
        dataSource: updatedDataSource,
        editingIndex: null,
      };
      case "SET_SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.payload,
        };
    case "CANCEL_DATA":
      return {
        ...state,
        dataSource: null,
        editingIndex: null,
        formData: null,
      };

    default:
      return state;
  }
};

export default dataReducer;
