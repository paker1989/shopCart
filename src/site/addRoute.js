const routes = [];

function addRoute(navData, prefix = '') {
  navData.forEach((nav) => {
    const { name, path, source } = nav;
    routes.push({
      path: `${prefix}/${path}`,
      source,
      name,
    })
  });
  
  return routes;
}

function getFullPath(path) {
  return `/demo/${path}`;
}

export { addRoute, getFullPath };