const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host: 'bsou6roinuscdyb4lihj-mysql.services.clever-cloud.com',
    user: 'ubj5vfv0llpepqn4',
    password: 'H5k62TkRFCpmfFiWnM0S',
    database: 'bsou6roinuscdyb4lihj'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

app.get("/api/test", function (req, res) {
    res.send("test request");
});

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';
    let candidate = '';
    let language = ''; 

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to voting system!
           Murakaza neza kurubuga rw'vote!
        1. Kinyarwanda
        2. English`;
        sendResponse(res, response);
    } else if (text == '1') {
        // Business logic for first level response
        response = `CON Hitamo Umukandida
        1. UMURUTASATE Claude
        2. KABERA Jean Darmsene
        3.RUGIRA Claude
        4. UMURISA J'Darc`;
        sendResponse(res, response);
    } else if (text == '2') {
        response = `CON Select candidate
        1. UMURUTASATE Claude
        2. KABERA Jean Darmsene
        3.RUGIRA Claude
        4. UMURISA J'Darc`;
        sendResponse(res, response);

        //FOR KINYARWANDA LANGUAGE
    } else if (text == '1*1') {
        candidate = 'UMURUTASATE Claude';
        response = `CON Emeza gutora ${candidate}
            1.Yego
            2.Oya`;
        sendResponse(res, response);
    } else if (text == '1*2') {
        candidate = 'KABERA Jean Darmsene';
        response = `CON Emeza gutora ${candidate}
            1.Yego
            2.Oya`;
        sendResponse(res, response);
    } else if (text == '1*3') {
        candidate = 'Itangishaka Claude';
        response = `CON Emeza gutora ${candidate}
            1.Yego
            2.Oya`;
        sendResponse(res, response);
    } else if (text == '1*4') {
        candidate = 'UMURISA J'Darc';
        response = `CON Emeza gutora ${candidate}
            1.Yego
            2.Oya`;
        sendResponse(res, response);

        //FOR ENGLISH USERS
    } else if (text == '2*1') {
        candidate = 'UMURUTASATE Claude';
        response = `CON Confirm to vote ${candidate}
            1.Yes
            2.No`;
        sendResponse(res, response);
    } else if (text == '2*2') {
        candidate = 'KABERA Jean Darmsene';
        response = `CON Confirm to vote ${candidate}
            1.Yes
            2.No`;
        sendResponse(res, response);
    } else if (text == '2*3') {
        candidate = 'Itangishaka Claude';
        response = `CON Confirm to vote ${candidate}
            1.Yes
            2.No`;
        sendResponse(res, response);
    } else if (text == '2*4') {
        candidate = 'UMURISA J'Darc';
        response = `CON Confirm to vote ${candidate}
            1.Yes
            2.No`;
        sendResponse(res, response);

        //VOTING (YES) IN KINYARWANDA
    } else if (text == '1*1*1') {
        language = 'kinyarwanda';
        candidate = 'UMURUTASATE Claude';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '1*2*1') {
        language = 'kinyarwanda';
        candidate = 'KABERA Jean Darmsene';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '1*3*1') {
        language = 'kinyarwanda';
        candidate = 'Itangishaka Claude';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '1*4*1') {
        language = 'kinyarwanda';
        candidate = 'UMURISA J'Darc';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);

        //VOTING (YES) IN ENGLISH
    } else if (text == '2*1*1') {
        language = 'english';
        candidate = 'UMURUTASATE Claude';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '2*2*1') {
        language = 'english';
        candidate = 'KABERA Jean Darmsene';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '2*3*1') {
        language = 'english';
        candidate = 'Itangishaka Claude';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);
    } else if (text == '2*4*1') {
        language = 'english';
        candidate = 'UMURISA J'Darc';
        checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language);

        //IF USER SELECTED NO
    } else if(text == '1*1*1*00' || text == '1*2*1*00' || text == '1*3*1*00' || text == '1*4*1*00'){
        language = "kinyarwanda";
        getVotes(res,language);
    }else if(text == '2*1*1*00' || text == '2*2*1*00' || text == '2*3*1*00' || text == '2*4*1*00'){
        language = "english";
        getVotes(res,language);
    }else if(text == '1*1*1*0' || text == '1*2*1*0' || text == '1*3*1*0' || text == '1*4*1*0'){
        language = "kinyarwanda";
        ext(res,language);
    }else if(text == '2*1*1*0' || text == '2*2*1*0' || text == '2*3*1*0' || text == '2*4*1*0'){
        language = "english";
        ext(res,language);
    } else if (text == '1*1*2' || text == '1*2*2' || text == '1*3*2' || text == '1*4*2') {
        response = 'END Mwakoze Gukoresh iyi service ';
        sendResponse(res, response);
    } else if (text == '2*1*2' || text == '2*2*2' || text == '2*3*2' || text == '2*4*2') {
        response = 'END Thank you for using our services';
        sendResponse(res, response);
    } else {
        response = `END Invalid input!`;
        sendResponse(res, response);
    }

    function saveVote(res, sessionId, serviceCode, phoneNumber, text, candidate) {
        const sql = 'INSERT INTO vote (sessionId, serviceCode, phoneNumber, text, candidate) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [sessionId, serviceCode, phoneNumber, text, candidate], (err, result) => {
            if (err) {
                console.error('Error saving vote:', err.message);
                response = `END Error saving vote. Please try again.`;
                sendResponse(res, response);
                return; // Stop execution if there's an error
            }
            console.log('Vote saved successfully');
            response = `END Voting ${candidate} successful!`;
            sendResponse(res, response);
        });
    }

    function checkVote(res, sessionId, serviceCode, phoneNumber, text, candidate, language) {
        const sql = 'SELECT * FROM vote WHERE phoneNumber = ?';
        db.query(sql, [phoneNumber], (err, result) => {
            if (err) {
                console.error('Error fetching data:', err.message);
                response = `END Error checking vote. Please try again.`;
                sendResponse(res, response);
                return; // Stop execution if there's an error
            }
            if (result.length > 0) {
                response = language === 'kinyarwanda'
                    ? `CON Wamaze gutora! Hitamo:
                    00. Reba amajwi
                    0. Sohoka`
                    : `CON You have already voted! Choose:
                    00. View votes
                    0. Exit`;
                sendResponse(res, response);
            } else {
                saveVote(res, sessionId, serviceCode, phoneNumber, text, candidate);
            }
            console.log('Query executed successfully!');
        });
    }

    function getVotes(res,language) {
        const sql = 'SELECT candidate, COUNT(*) AS repetition_times FROM vote GROUP BY candidate';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching votes:', err.message);
                response = `END Error fetching votes. Please try again.`;
                sendResponse(res, response);
                return; // Stop execution if there's an error
            }
    
            let votesResponse = '';
            let counter = 1;
    
            if (results.length > 0) {
                results.forEach(row => {
                    const candidate = row.candidate;
                    const votes = row.repetition_times;
                    votesResponse += `${counter}. ${candidate}: ${votes}\n`;
                    counter++;
                });
            } else {
                votesResponse = 'No votes recorded yet.';
            }
    
            // Send the response
            response = language === 'kinyarwanda'
                ? `END Amajwi:\n${votesResponse}`
                : `END Votes:\n${votesResponse}`;
            sendResponse(res, response);
        });
    }
    
    function ext(res,language){
        response = language === 'kinyarwanda'
        ? `END Mwakoze gukoresha iyi serivisi`
        : `END Thank you for using our services`;
    sendResponse(res, response);        
    }
    
    function sendResponse(res, response) {
        res.set('Content-Type: text/plain');
        res.send(response);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`USSD server listening on http://localhost:${PORT}`));
