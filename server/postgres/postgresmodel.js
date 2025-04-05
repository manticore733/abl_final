import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sample_database", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 10, // Max connections
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging:false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connection };
