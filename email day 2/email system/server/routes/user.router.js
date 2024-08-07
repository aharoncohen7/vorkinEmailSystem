const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const userRouter = express.Router()
const userServices = require("../BL/user.services")

// קבלת כל היוזרים
userRouter.get("/", async (req, res) => {
    console.log("start get all");
    try {
        const users = await userServices.getAllUsers()
        console.log(users);
        res.send(users)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});

// קבלת חברי צ'אט לפי כתובת אימייל
userRouter.get("/by-email/:email", async (req, res) => {
    // console.log("in get members by-email");
    const searchString = req.params.email;
    try {
        const users = await userServices.getMembersByEmail(searchString)
        // console.log(users);
        res.send(users)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});

// קבלת יוזר לפי מזהה
userRouter.get("/:userId", async (req, res) => {
    console.log("start get user by id");
    const userId = req.params.userId;
    try {
        const user = await userServices.getUserById({ _id: userId })
        // console.log(user);
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});



// (מחיקת התראות (עדכון
userRouter.put("/delete-notifications/:userId", async (req, res) => {
    console.log("start delete-notifications ========================================================");
    const userId = req.params.userId;
    try {
        const updatedUser = await userServices.updateUserById( userId , {notifications: []})
        // console.log(updatedUser);
        res.send(updatedUser)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});





// (מחיקת יוזר - (עדכון
userRouter.put("/:userId", async (req, res) => {
    console.log("start delete user");
    const userId = req.params.userId;
    try {
        const updatedUser = await userServices.deleteById(userId)
        // console.log(updatedUser);
        res.send(updatedUser)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});

module.exports = { userRouter }


















// // דואר נכנס
// userRouter.get("/emails/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isReceived:true}}})
//         console.log(allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // דואר יוצא
// userRouter.get("/emails/outbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allSent = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isSent:true}}})
//         console.log(allSent);
//         res.send(allSent)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // מועדפים
// userRouter.get("/emails/favourites", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const favourites = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isFavorite:true}}})
//         console.log(favourites);
//         res.send(favourites)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // לא נקרא
// userRouter.get("/emails/unread", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
//         console.log(allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })



// //  update email
// userRouter.put("/emails/:emailId", async (req, res) => {
//     console.log("start update email ");
//     try {
//         const field = req.body.filedToUpdate;
//         const userId = req.user._id;
//         const emailId = req.params.emailId;
//         console.log(field, userId, emailId)
//         const updatedEmail = await userServices.updateUserChat({_id:userId, emails:{$elemMatch:{email:{_id: emailId}}}}, field)
//         console.log(updatedEmail);
//        res.send(updatedEmail)
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// });



