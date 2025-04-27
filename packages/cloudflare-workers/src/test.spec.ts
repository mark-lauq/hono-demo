import { expect } from "chai";
import { app } from "./index";

describe("Test the application", () => {
  it("Should return 200 response", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).to.equal(200);
  });
});
