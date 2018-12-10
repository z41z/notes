const getQueryParams = (url = window.location.href) => {
  const params = {}
  url.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
};

module.exports.default = module.exports = getQueryParams;
