const Collaborator = require("./models").Collaborators;

module.exports = {

    createCollaborator(newCollaborator, callback) {

        return Collaborator.create({

            userId: newCollaborator.userId,
            wikiId: newCollaborator.wikiId
        })
        .then((collaborator) => {

            callback(null, collaborator);
        })
        .catch((err) => {
            callback(err);
        });

    },

    getCollaborators(id, callback) {

        return Collaborator.all({where:{wikiId: id}})

        .then((collaborators)=> {
            callback(null, collaborators);
        })
        .catch((err) => {
            callback(err);
        });
    },

    deleteCollaborator(id, callback) {

        return Collaborator.destroy( {
            where: {userId: id}
        })
        .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
        })
        .catch((err) => {
            callback(err);
        });
    }

}
