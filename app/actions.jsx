var addPath = function (path) {
  return {
    type: "ADD_PATH",
    path
  }
};

var deletePath = function (path) {
  return {
    type: "DELETE_PATH",
    path
  }
};

var editPath = function (path) {
  return {
    type: "EDIT_PATH",
    path
  }
};

var undoPath = function (path) {
  return {
    type: "UNDO_PATH",
    path
  }
};

var redoPath = function (path) {
  return {
    type: "REDO_PATH",
    path
  }
};
 
module.exports = {addPath, deletePath, editPath, undoPath, redoPath};