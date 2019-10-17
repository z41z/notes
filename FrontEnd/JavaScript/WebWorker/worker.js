onmessage = function (e) {
  let [firstName, lastName] = e.data
  this.fetch(`/openSearch.php?firstName=${firstName}&lastName=${lastName}`).then((res) => {
    return res.json()
  }).then(res => {
    postMessage(res.sub_msg);
  })
}