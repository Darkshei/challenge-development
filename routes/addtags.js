const express = require('express');
const router = express.Router();
const Database = require('sqlite-async');

/* POST Add tags to the repo of a specific user. */
router.post('/set', async (req, res, next) => {
    Database.open('tags.db').then(db => {
        const {full_name, tags}= req.body;

        if (full_name == undefined || tags == undefined) {
            res.status(400).json({
                error: "Syntax error, please specify all entries"
            })
            return console.log("Error : Syntax error, please specify all entries")
        }

        db.run("INSERT OR REPLACE INTO TagsTable (repoPath, tags) VALUES (?, ?)", [`${full_name}`, tags])
        res.status(200).json({
            info: "Tags modified"
        })
    }).catch(err => {
        res.status(404).json({
            error: "Internal error"
        })
    })
});

module.exports = router;
