import {UserMgmtService} from "../src/services/userMgmtService"

const userMgmtService = new UserMgmtService();

//***** Test cases for change  password *********/
describe("test changePassword function", () => {
  it("should return Success  for userChangePassword()", () => {
    let data={
        oldPassword:"Pass@123",
        newPassword:"Test@123",
        confirmNewPassword:"Test@123"
    }
      //**** assertion  *****/
    expect(userMgmtService.userChangePassword(data,1)).toBe('Password changed successfully.');
  });

  it("should return error message for add(2,3)", () => {
    let data={
        oldPassword:"QWass@123",
        newPassword:"Test@123",
        confirmNewPassword:"Test@123"
    }
      //**** assertion  *****/
    expect(userMgmtService.userChangePassword(data, 3)).toBe("Old passwrd does not match");
  });
});

