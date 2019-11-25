var Map = require("immutable").Map;

var reducer = function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    case "ADD_PATH":
        return state.update("paths", (paths) => paths.push(action.path));
    case "UNDO_PATH":
        return ReduxUndo.ActionCreators.undo();
    case "REDO_PATH":
        return ReduxUndo.ActionCreators.redo();
    case "DELETE_PATH":
        return state.update("paths",
            (paths) => paths.filterNot(
                (item) => item === action.path
            )
        );
    case "EDIT_PATH":
        return state.map(item => {
        if (item.id !== action.id) return item;

        return {
          ...item,
          text: action.text
        };
      });
  }
  return state;
}
module.exports = reducer;