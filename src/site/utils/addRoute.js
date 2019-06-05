const routes = [];

function addRoute(navData) {
  navData.forEach((nav) => {
    const { name, path, source } = nav;
    routes.push({
      path,
      source,
      name,
    })
  });
  
  return routes;
}

function getFullPath(match, path) {
  return `${match.url}/${path}`;
}

export { addRoute, getFullPath };