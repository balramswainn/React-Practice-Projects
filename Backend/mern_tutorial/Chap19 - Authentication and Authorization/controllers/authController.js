const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,          //by default humne isLoggedIn false kiya hai true hone pe hi sab menu and pages show honge 
    errors: [],                 //by default empty hi rahega bcz koi error aya hi nhi hai
    oldInput: {email: ""},       
    user: {},                //bcz user create hi nhi hua ab tak hum postlogin me kar rhe create .........user jo session me store kiya hai iska mtlb user :- 'guest' ya 'host' hai ye pata karna hai signup karte time pata chal jaega but ye toh login hai abhi thodi hume pata hai so isiliye user : empty object ....humne condition lagayi hai na guest ya host k according menu dikhega
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],          //new signup me sab empty hi rahega
    oldInput: {firstName: "", lastName: "", email: "", userType: ""}, //Ye bas empty object tum khud bhej rahe ho, taaki signup page jab pehli baar load hota hai, tab form fields blank rahein. isse ejs me bhejenge waha pe functionality diya hai oldinput diya hai toh input me user ko show kar
    user: {},          //bcz user create hi nhi hua ab tak hum postlogin me kar rhe create 
  });
};



//Pehle tum sirf ek controller likhte the: exports.postSignup = (req, res, next) => {} Ye tab kaam karta hai jab: koi validation nahi hota sirf ek function run karna hota hai
//now 2. express-validator = multiple middleware functions ki requirement , express-validator ka design hi aisa hai ki har validation ek middleware hota hai.& Express me hum route ke andar multiple middlewares use kar sakte hain: router.post('/signup', mid1, mid2, mid3, finalController); Lekin agar middlewares 3–4 nahi 15 ho jayen, toh route messy lagne lagta hai. Solution → Make an array. 
// exports.postSignup = [
//    middleware1,
//    middleware2,
//    middleware3,
//    finalController
// ]; Saari validations ek jagah, easily readable.,Express automatically inko order me run karta hai

// Express allows multiple middlewares in a single route.We use this when we need to perform many checks before running the final controller — such as form validation, authentication, authorization, file upload, etc.
// Each middleware runs in order, and the last function handles the actual request (controller).

// flow : 
// 1. User clicks Submit → Request Express server ko jata hai 
// 2. Middleware chain start hoti hai (TOP → BOTTOM order) Tumhare controller me array hai: exports.postSignup = [ check(...), check(...),() => {} ] Express inko sequence me run karta hai:
// 3. Validations hamesha request body aane ke baad hi run hoti hain.User submits form → req.body arrives → middlewares validate req.body
// 4. express-validator internally validation errors collect karta hai, All errors are collected internally, par route next middleware par chalta rahta hai. 
// 5. Last middleware execute hota hai , Yaha express-validator poore errors ko single array me return karta hai.Agar errors hai:Execution stops → form wapas show with errors. -> If no errors → save user

// req.body hamesha route ke start me hi aa jata hai, express-validator ke check() functions AUTOMATICALLY req.body ko read kar lete hain internally access karta hai Tumne req.body likhne ki zaroorat nahi,Iska req.body ko last middleware me likhne se koi relation nahi


exports.postSignup = [  //Array of middlewares start — Express inko sequence me run karega.
  check("firstName")             //firstName field ko validate karna start.
  .trim()                        //Extra spaces remove.
  .isLength({min: 2})            //At least 2 characters required.
  .withMessage("First Name should be atleast 2 characters long")     //Error message if length is less.
  .matches(/^[A-Za-z\s]+$/)                                          //Only alphabets + spaces allowed.
  .withMessage("First Name should contain only alphabets"),          //Error message for invalid chars.

  check("lastName")              //Validate lastName field.
  .matches(/^[A-Za-z\s]*$/)      //Only alphabets allowed (empty string also allowed).
  .withMessage("Last Name should contain only alphabets"),

  check("email")                 //Email Validation
  .isEmail()                     //Check valid email format.
  .withMessage("Please enter a valid email")
  .normalizeEmail(),             //Converts to lowercase and removes dots if needed.

  check("password")              //Validate password field.
  .isLength({min: 8})            //Minimum 8 characters.
  .withMessage("Password should be atleast 8 characters long")
  .matches(/[A-Z]/)              //At least 1 uppercase letter required.
  .withMessage("Password should contain atleast one uppercase letter")
  .matches(/[a-z]/)              //At least 1 lowercase letter.
  .withMessage("Password should contain atleast one lowercase letter")
  .matches(/[0-9]/)              //At least one number.
  .withMessage("Password should contain atleast one number")
  .matches(/[!@&]/)              //Must contain a special character (! @ &).
  .withMessage("Password should contain atleast one special character")
  .trim(),                       //Trim spaces.

  check("confirmPassword")       //Confirm Password Validation
  .trim()
  .custom((value, {req}) => {    //Custom validator — yaha hum apna logic likh sakte ho. 
  // value = confirmPassword ka value (jo user ne form me type kiya)
  // {req} = pura request object, jisse hum req.body.password access kar sakte hain
    if (value !== req.body.password) {     //Agar confirmPassword ka value password ke equal nahi hai,
      throw new Error("Passwords do not match");
    }
    return true;                 //If match → success.
  }),

  check("userType")              //User Type (guest/host) validation
  .notEmpty()                    //Must select something (cannot be empty).
  .withMessage("Please select a user type")
  .isIn(['guest', 'host'])       //Only these 2 values allowed.
  .withMessage("Invalid user type"),

  check("terms")                 // terms validation
  .notEmpty()                    //Checkbox must be checked.
  .withMessage("Please accept the terms and conditions")
  .custom((value, {req}) => {    //custom validator
    if (value !== "on") {        //HTML checkbox checked hota hai → value = "on" ,Agar value "on" nahi hai → matlab checkbox NOT checked
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),
  
  (req, res, next) => {           //FINAL Middleware — Handle errors + Save user ,,,Last middleware — this runs AFTER validations.
    const {firstName, lastName, email, password, userType} = req.body;   //Extract user input from req.body Form ke saare values
    const errors = validationResult(req);//express-validator kesaare validation errors ko ekjagah collect karke array me return karta hai.
    if (!errors.isEmpty()) {  // means error empty nhi hai -> error hai toh run hoga 
      return res.status(422).render("auth/signup", {   //Re-render signup page with errors.User ko errors aur purani values dikhaenge
        pageTitle: "Signup",    //422 = Unprocessable Entity → Server ko data mila but data galat hai (invalid).
        currentPage: "signup",  //200 → OK, 400 → Bad request ,422 → Request sahi hai, but data galat hai, client-side mistakes
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg), // har error ka object deta hai sirf error messages extract karta hai Example: ["Email invalid", "Password too short","new error"]
        oldInput: {firstName, lastName, email, password, userType},  //So form fields don't reset. Purani values return karte hain Taaki form reset na ho aur user ko dubara bharna na pade ... ye short cut hai object destructuring k baad ese likhne ka firstName:"jerry " -> firstNAme Isko object property shorthand bolte hain.
        user: {},//bcz user create nhi hua abtak hum postlogin me create hoag     //If validation errors exist → return (execution stops).
      });
    }
    //bcryptjs is a JavaScript implementation of the bcrypt password hashing function. It is a library commonly used in Node.js applications for securely storing and verifying user passwords.........Password hashing — 12 rounds of salting (secure) hash 12 baar hoga  -> one sided hai mtlb wapis password nhi nikala ja sakta hai isse bcrypt se db me bhi malum padega password kya hai isliye forgot passs me new banana padta hai bcz they also dont know
    bcrypt.hash(password, 12) //If no errors — Hash password .Plain password ko encrypted password me convert karta hai
    .then(hashedPassword => {     //hash promise return karta hai  //Yaha hum password ka encrypted version store karte hain
      const user = new User({firstName, lastName, email, password: hashedPassword, userType});
      return user.save();  // User successfully saved in database
    })
    .then(() => {                 //After successful signup, redirect to login page.
      res.redirect("/login");
    }).catch(err => {             //If user.save() fails (e.g., duplicate email), show error message.
      return res.status(422).render("auth/signup", {  //Wapas signup page dikhate hain error ke saath
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],          //error msg     
        oldInput: {firstName, lastName, email, userType},  // Note: password intentionally nahi diya — for security
        user: {},   //bcz user create hi nhi hua ab tak hum postlogin me kar rhe create 
      });
    });
  }
]

exports.postLogin = async (req, res, next) => {  //async because hum await use karenge (DB calls, bcrypt compare)
  const {email, password} = req.body;
  const user = await User.findOne({email}); //-> email:email shortcut  Database me email match karne wala user search karo
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],  //Matlab user registered hi nahi hai
      oldInput: {email},      // jo email tha wesa hi rehne do
      user: {},          //bcz user create hi nhi hua ab tak 
    });
  }
  // email: bswebdev7@gmail.com
// p: Bbswebdev7@gmail.com

  const isMatch = await bcrypt.compare(password, user.password);
  //bcrypt.compare() password checking ke liye use hota hai.
  //Ye plain password ko hashed password se compare karta hai.
  // password -> jo user no login karte waqt dala ||| user.password -> jo db me store hai woh password
  //await ka matlab: iska result aane tak ruk jao (because compare() is async)
  if (!isMatch) { // match nhi hua toh 
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: {email},
      user: {},
    });
  }
  // har jagah humne define kiya isLoggedin -> true hoga toh menu dikhega but jyada secure hone k liye hum session use kiya jo backend collection me store kar rha hai isloggedin ka value so jese hi sahi email,password aya session me jake value ko true kardiya ab isse hume req.isloggedin jo menu decide karega usseko bhi batana hai jo mene app.js me kiya hai .....aur ek way bhi hai jaha jaha isLoggedIn hai like har render pe isLoggedIn: req.isLoggedIn,  use -> isLoggedIn: req.session.isLoggedIn,  isse directly session se hi lelega but abhi apply nhi kiya hai
  req.session.isLoggedIn = true;  //If email + password both correct → SUCCESS LOGIN Browser ko sessionId cookie milega
  req.session.user = user; //Complete user object session me store kar diya jo uper se find karke nikala na user id se wohi pura object ata hai usme toh usko hi session me daldiya like user = { _id: "6738abcd", firstName: "Balram", email: "balram@gmail.com", password: "$2a$salt.hash",userType: "guest"} EJS me user data use kar sakte ho (userType, firstName, etc.) baadme if dikahana hua kahi pe ki ye banda login hai profile wagera  
  await req.session.save(); //Same user object ko SESSION ke andar store kar do , Taaki agle requests me server user ko identify kar sake  Some hosting me save async hoti hai, isliye await use kiya
  //Session ko MongoDB store me save hone me thoda time lag sakta hai → async operation hota hai. Agar tum bina save kiye turant redirect kar doge:Toh kabhi-kabhi (rare case):Session save nahi hota,Browser ko cookie nahi milti,User logged-in nahi dikhega

  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
   req.session.destroy(() => {  //user ka session completely delete karta hai aur logout implement karne ke liye use hota hai.
    res.redirect("/login");  //session ko MongoDB ki collection se bhi delete kar deta hai.
  })
}

//flow :  for cookies and sessions
// 1. user login req send karta hai.....server session create kardeta hai db me and cookie wapis bhej deta hai 
// 2. user sends again a req then user apni purani session id ki cookie lekar ata hai woh cookie hum db me jo session hai store hai usme search karte hai session mil jata hai toh unhe wapis dediya jatahai nhi milta toh bolte hai ki wapis login karo , wapis authenticate karo

// ek baar authentication humne bana liya and save karliya ya cache karliya apne session me aur uske baad hum maan kar chal rhe hai ki for all subsequent req jab tak user mere pass cookie lekar ata rahega me manunga user authentic hai


//for authentication 
// flow - sabse pehle signup.ejs create kiya  form ka ui change kiya and authrouter and authcontroller k liye get and post signup banaya hai and ab authcontroller me post k liye authentication dal rhe hai express-validator se
// 1. npm i express-validator
// sab validation lagaya -> middleware me error nhi aya toh save error aya toh display so for that
// 2. create error.ejs in partials jisee hum error show kar paye signup me
// 3. create user.js -> we need schema and model to create collection jisse db me hum user store kar paye
// 4. form se req.body se value aaega fhir use barobar dalna hai db me 
// 5. npm i bcryptjs -> we want password kisiko pata na chale  (bcrypt (C++ based)) bcryptjs (pure JS)






// express-validator Express.js ka ek package hai jo
// backend form validation karne ke kaam aata hai.

// Matlab:
// 👉 API / backend me input data sahi hai ya galat
// 👉 Ye check karne ke liye ready-made tools deta hai.


// ⭐ Why do we use express-validator?
// ✔ To validate user input
// Example check:
// Email valid hai ya nahi
// Password min 6 characters hai
// Price number hai ya nahi
// Empty fields allowed nahi

// ✔ Prevent hackers and invalid data

// Stops:
// SQL injection
// Malicious text
// Invalid formats
// ✔ Cleaner code
// Validation ka pura logic ek jagah mil jata hai.