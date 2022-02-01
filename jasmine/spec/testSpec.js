 describe("function isInputValid", function() {
  it("check correct input", function() {
    expect(airplanecontroller.isInputValid([[2,3], [1,6]], 3)).not.toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(airplanecontroller.isInputValid([[NaN, 3]], 34)).toBe(false);
  });
  it("check too long string to array", function() {
    expect(airplanecontroller.isInputValid([[2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6]], 34)).toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(airplanecontroller.isInputValid([[-5, 2], [1, 6]], 34)).toBe(false);
  });
});
