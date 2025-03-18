const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());


const SERVICES_DATA_FILE = "servicesData.json";


// Handle form submission  
app.post("/services/submit", (req, res) => {
    const formData = req.body;


    // Read existing data
    fs.readFile(SERVICES_DATA_FILE, (err, data) => {
        let jsonData = [];
        if (!err) {
            jsonData = JSON.parse(data);
        }


        jsonData.push(formData);


        // Write updated data
        fs.writeFile(SERVICES_DATA_FILE, JSON.stringify(jsonData,), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving data" });
            }
            res.json({ message: "Data saved successfully!" });
        });
    });
});


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));



