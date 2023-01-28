const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
    comment: [],
    comloading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAILED":
      return { ...state, uploading: false, error: true };

    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RITREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "DELETE_START":
      return { ...state, loading: true, error: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id),
        loading: false,
        error: false,
      };
    case "DELETE_FAILED":
      return { ...state, loading: false, error: true };

    //this is for adding comments

    case "COMMENT_START":
      return { ...state, error: false };
    case "COMMENT_SUCCESS":
      return {
        ...state,
        comment: [action.data],
      };
    case "COMMENT_FAIL":
      return { ...state, loading: false, error: true };

    // deleting comments

    case "COMMDELETE_START":
      return { ...state, comloading: true, error: false };
    case "COMMDELETE_SUCCESS": {
      console.log(action, "inside reducer");
      return {
        ...state,
        comment: [action.data],
        comloading: false,
        error: false,
      };
    }

    case "COMMDELETE_FAIL":
      return { ...state, comloading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
