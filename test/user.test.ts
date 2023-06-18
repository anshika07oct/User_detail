import { UserAuthService} from "../src/services/userAuthServices";

const userAuthServices = new UserAuthService();

//**** Test case for user signup ****/
describe("test for signup function", () => {
  it("should return Success message for userSignup()", () => {
      let userData={
        email:"abc@gmail.com",
        name:"Test user",
        countryCode:'91',
        phoneNumber:'9455433234'

      }
    expect(userAuthServices.userSignUp(userData)).toBe("User Sign-up Successfully");
  });

  it("should return error message for signup api ", () => {
    let userData={
      email:"abc@gmail.com",
      name:"Test user",
      countryCode:'+91',
      phoneNumber:9455433234

    }
    //***assertion*** */
  expect(userAuthServices.userSignUp(userData)).toBe("Email id already registred please try again with some other email");
});
})

//***** Test cases for verify otp  *****/
describe("test  for verify otp  function", () => {
  it("should return  success message for verifyUserOtp()", () => {
    let data={
        countryCode:'+91',
        phoneNumber:985567432,
        otp:1234
    }
    //****assertion ***** */
    expect(userAuthServices.verifyUserOtp(data)).toBe('OTP Verified Successfully');
  });
});

//***** Test cases for send otp *********/
describe("test  for send otp  function", () => {
    it("should return success message for sendOtp(", () => {
        let data={
            countryCode:'+91',
            phoneNumber:987654321
        }
      expect(userAuthServices.sendOtp(data)).toBe('OTP send Suucessfully');
    });
    it("should return error message for sendOtp(", () => {
      let data={
          countryCode:'+91',
          phoneNumber:6767654321
      }
      //**** assertion  *****/
    expect(userAuthServices.sendOtp(data)).toBe('Please enter valid phone number');
  });
  });

//***** Test cases for login  *********/
describe("test  for login   function", () => {
    it("should return Success for login()", () => {
      let data={
        phoneNumber:9876543212,
        email:'shakti@getnada.com',
        password:"Test@123"

      }
      expect(userAuthServices.login(data)).toBe('User logged-in Successfully');
    });
    it("should return error message  for login()", () => {
      let data={
        phoneNumber:9876543212,
        email:'test@getnada.com',
        password:"Test@123"

      }
        //**** assertion  *****/
      expect(userAuthServices.login(data)).toBe('Invalid credentials');
    });
  });

//***** Test cases for forgot  password *********/
describe("test  for forgot password   function", () => {
    it("should return Sucess message  for forgotPassword()", () => {
        //**** assertion  *****/
      expect(userAuthServices.forgotPassword('shakti@getnada.com')).toBe('OTP has been sent on your registered email id.');
    });

    it("should return error message   for forgotPassword()", () => {
        //**** assertion  *****/
      expect(userAuthServices.forgotPassword('akahsn@getnada.com')).toBe('User not found');
    });
  });

//***** Test cases for setnew  password *********/
describe("test  for setPassword otp  function", () => {
    let data={
      phoneNumber:9876543234,
      email:'shakti@getnada.com',
      password:'Test@123',
      confirmPassword:'Test@123'
    }
    it("should return Success for setNewPassword()", () => {
        //**** assertion  *****/
      expect(userAuthServices.setNewPassword(data)).toBe('Passowrd changed Successfully');
    });
  });