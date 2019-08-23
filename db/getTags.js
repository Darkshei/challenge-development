// For further organization but MEEH too lazy

const Database = require('sqlite-async');

async function getRepoTags(full_name, search) {
    if(search != undefined) {
        const db = await Database.open('tags.db');
        const rows =  await db.all("SELECT repoPath FROM TagsTable WHERE instr(tags, ?) > 0", [search]);
        return (rows.length < 1 ? "" : rows[0].tags)
    }
    
    const db = await Database.open('tags.db');
    const rows =  await db.all("SELECT tags FROM TagsTable WHERE repoPath=?", [full_name]);
    return (rows.length < 1 ? "" : rows[0].tags)
}

module.exports = getRepoTags