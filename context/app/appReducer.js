const AppReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'BEGIN_UPLOAD':
      return { ...state, loading: true };
    case 'UPLOAD_SUCCESS':
      const { original_name, name } = payload;
      return {
        ...state,
        original_name,
        name,
        loading: false,
      };
    case 'LINK_CREATED':
      return {
        ...state,
        url: payload,
      };
    case 'SHOW_ALERT':
    case 'UPLOAD_FAIL':
      return {
        ...state,
        message: payload,
        loading: false,
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        message: null,
      };
    case 'RESET_STATE':
      return {
        ...payload,
      };
    case 'ADD_PASSWORD':
      return { ...state, password: payload };
    case 'SET_DOWNLOADS':
      return { ...state, downloads: payload };
    default:
      return state;
  }
};

export default AppReducer;
