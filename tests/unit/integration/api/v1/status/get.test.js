it("should return 200 on GET to /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedDate = new Date(responseBody.updated_at);
  expect(parsedDate.toISOString()).toBe(responseBody.updated_at);

  const database = responseBody.dependencies.database;
  expect(typeof database.version).toBe("string");
  expect(database.version).toMatch(/^\d+(\.\d+)+/);

  expect(Number.isInteger(database.max_connections)).toBe(true);
  expect(database.max_connections).toBeGreaterThan(0);

  expect(Number.isInteger(database.used_connections)).toBe(true);
  expect(database.used_connections).toBeGreaterThanOrEqual(1);
  expect(database.used_connections).toBeLessThanOrEqual(
    database.max_connections,
  );
});
