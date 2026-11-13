import database from "infra/database.js";

const status = async (req, res) => {
  const versionResult = await database.query("SHOW server_version;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");

  const text = `SELECT count(*)::int AS used_connections
                FROM pg_stat_activity
                WHERE datname = $1
                  AND backend_type = $2;`;
  const values = [process.env.POSTGRES_DB, "client backend"];

  const usedConnectionsResult = await database.query({ text, values });
  const updatedAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionResult.rows[0].server_version,
        max_connections: Number(maxConnectionsResult.rows[0].max_connections),
        used_connections: usedConnectionsResult.rows[0].used_connections,
      },
    },
  });
};

export default status;
