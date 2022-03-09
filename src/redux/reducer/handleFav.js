const favorites = [];

const handleFav = (state = favorites, action) => {
  const item = action.payload;

  switch (action.type) {
    case "ADD":
      const exist = state.find((x) => x.id === item.id);
      if (exist) {
        return state.map((x) => (x.id === item.id ? { ...x } : x));
      } else {
        const item = action.payload;
        return [
          ...state,
          {
            ...item,
          },
        ];
      }
      break;

    case "DELETE":
      const exist1 = state.find((x) => x.id === item.id);
      return state.filter((x) => x.id !== exist1.id);

    default:
      return state;
  }
};

export default handleFav;
