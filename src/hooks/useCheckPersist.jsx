function checkPersist() {
  // Get the value of the persist key from local storage
  const persist = localStorage.getItem("persist");

  // Return whether the value is true
  return persist === "true";
}

export default checkPersist;