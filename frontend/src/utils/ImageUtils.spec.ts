import ImageUtils from "./ImageUtils";

describe("ImageUtils", () => {
  it("should throw an error when decoding an invalid base64 string", () => {
    const invalidBase64String = "invalid-base64-string";

    expect(() => ImageUtils.base64ToBlob(invalidBase64String)).toThrowError("Invalid base64 string format");
  });
});
