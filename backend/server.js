const app = require("./app");

require('./config/loadEnv');

const PORT = process.env.PORT || 3001;

const { sequelize } = require('./config/db');

sequelize.authenticate()
  .then(() => console.log('✅ Connected to the database successfully'))
  .catch((err) => console.error('❌ Database connection failed:', err));

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
