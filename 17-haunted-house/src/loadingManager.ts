import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (
  url: string,
  itemsLoaded: number,
  itemsTotal: number
) {
  console.log(
    "Started loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

loadingManager.onLoad = function () {
  console.log("Loading complete!");
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

export default loadingManager;
