# Setup

    npm install
    npm run start

Once done, be sure to setup your github credits in *config.js*

# Requests
## GET /getrepos/:username
Get all repositories from a specific user
**Example :**
/getrepos/Darkshei

```json
[
   {
      "name":"challenge-development-master",
      "language":"Javascript",
      "tags":"Brainnco"
   },
   {
      "name":"Ryotaro",
      "language":"",
      "tags":""
   }
]
```
## POST /tags/set
Set the tag of a repository

**Body** :

 - username : STRING
 - repo : STRING
 - tags : STRING
