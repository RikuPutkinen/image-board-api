function routeToURL(req, route) {
  const protocol = req.protocol;
  const host = req.get('host');
  const URL = `${protocol}://${host}${route}`;
  return URL;
}

module.exports = routeToURL;