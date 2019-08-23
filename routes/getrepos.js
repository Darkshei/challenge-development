const express = require('express');
const router = express.Router();
const axios = require('axios');
const Database = require('sqlite-async');
const repoFetcher = require('../db/getTags');

const config = require('../config');

/* GET Repos of a specific user. */
router.get('/:username', async (req, res, next) => {
    const search = req.query.search;
    const github_user = req.params.username;
    if (github_user == undefined) {
        res.status(400).json({
            error: "Syntax error, please specify a username"
        })
        return console.log("Error : Syntax error, please specify a username")
    }

    try {

        const github_feedback = await axios({
            method: 'get',
            url: `https://api.github.com/users/${github_user}/repos`,
            auth: config.github
        })


        let result = await Promise.all(github_feedback.data.map(async e => {
            // TODO : Implement DB Tags
            const tag = await repoFetcher(e.full_name);
            return {
                name: e.name,
                full_name: e.full_name,
                language: e.language,
                description: e.description,
                tags: tag,
                url: e.html_url
            }
        }))
        console.log(search);
        if (search != undefined) {
            console.log("hioooo")
            filtred_result = result.filter(e => {
                console.log(e)
                const cond = e.tags.toLowerCase().includes(search.toLowerCase())
                console.log(cond);
                return cond;
            })
            
            res.status(200).json(filtred_result);
        } else {
            res.status(200).json(result);

        }



    } catch (e) {
        res.status(404).json({
            error: "Username Not Found"
        })

        return console.log(e)
    }

});

module.exports = router;
