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

export { addRoute };