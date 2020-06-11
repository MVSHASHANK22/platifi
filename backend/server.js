const express=require("express");
const mongoose=require("mongoose");
UserDetails=require("./models/userDetails");
UserCredentials=require("./models/userCredentials");
OtpCollections=require("./models/otpCollections");
const nodemailer=require("nodemailer");
const express-session=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const app=express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:/gameDB",{useNewUrlParser : true});
app.use(bodyParser.json());

app.use(session({
    secret: "backend code",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserCredentials.authenticate()));
passport.serializeUser(UserCredentials.serializeUser());
passport.deserializeUser(UserCredentials.deserializeUser());
app.post('/api/signup',(req,res)=>{                      //postmethod which stores data of user in newUser variable
    const otp = randomString.generate();
    var newUser={
        email:req.body.email,
        verification:{
            isVerified:false,
            verificationCode:otp
        },
        details:{
            name:req.body.name,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth:req.body.dateOfBirth,
            resumeLink:req.body.resumeLink
        },
        otpData:{
          otp:otp,
          name:req.body.name,
          email:req.body.email
        }

    };

    const mailToBeSent = `
    <h3> Hi ${req.body.name} </h3>
    <h4> OTP for creating an account is : </h4>
    <p> ${otp} </p>
    `;

    UserCredentials.register(new UserCredentials({username:req.body.email}),req.body.password,(err,user)=>{
        if(err){
            return res.send(err.message);
        }
        else{
            passport.authenticate('local');
            UserDetails.create(newUser)
            .then((createdUser) => {
                // send mail here
                sendMail(mailToBeSent)
                .then(()=>{
                    console.log('email has been sent!');
                    res.send('email has been sent');
                    setTimeout(() => {
                        OtpCollections.findOne({'email':req.body.email})  //finds and deletes the otp from collection
                            .then(foundUser => {                          //after the expiration of time from the moment the mail
                              console.log("found otp of "+ foundUser.name); //is sent to user.
                              OtpCollections.findOneAndDelete({'email': foundUser.email})
                                .then(deleteOtp => {
                                  console.log("otp of "+ foundUser.name + " deleted from collections");
                                });
                                .catch(err => {
                                  console.log(err);
                                });
                            });
                            .catch(err => {
                              console.log(err);
                            });
                        console.log('calling delete functions');
                        UserDetails.findOne({'email':req.body.email})
                            .then(foundUser => {
                                console.log(foundUser);
                                if (foundUser.verification.isVerified == false) {
                                    // delete the user
                                    console.log("user found unverified!");
                                    UserCredentials.findOneAndDelete({ 'username': foundUser.email })
                                    .then(deletedUser => {
                                        console.log(deletedUser);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                                    UserDetails.findOneAndDelete({'email': foundUser.email })
                                    .then(deletedUser => {
                                        console.log(deletedUser);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }, 130000);
                })
                .catch(err =>{
                    console.log(err);
                })
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    });

});
