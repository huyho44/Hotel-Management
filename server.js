const app = require("./app");
// DB connection is initialized implicitly when required by controllers, but we can also require it here to log connection status early
require("./config/db"); 

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
