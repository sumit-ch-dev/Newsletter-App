const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing")


mailchimp.setConfig({
    apiKey: "045411aa1f7e67f51467300bdde506af",
    server: "us14",
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = "3eca9b19f2";
    const run = async () => {
        try {
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
            //console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch (err) {
            //console.log(err);
            res.sendFile(__dirname + "/failure.html");
        }
        
    }
    run();



});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    //console.log("Server started on port 3000");
});


//api key



//list id 
// 3eca9b19f2