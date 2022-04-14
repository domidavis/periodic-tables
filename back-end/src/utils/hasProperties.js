function hasProperties(properties) {
    return function (res, req, nxt) {
      const { data = {} } = res.body;
      properties.forEach((property) => {
        if (!data[property]) {
          return nxt({
            status: 400,
            message: `A '${property}' property is required.`,
          });
        }
      });
      nxt();
    };
  }
  
  module.exports = hasProperties;