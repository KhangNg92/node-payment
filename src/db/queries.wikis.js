const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborators;
const Authorizer = require("../policies/wiki.js");
const Sequelize = require("./models/index").sequelize;

module.exports = {

    getWiki(id, callback){

        return Wiki.findById(id, {
            include: [{
                model: Collaborator,
                as: "collaborators",
                attributes: [
                    "userId",
                    "id"
                ]
            }]
        })
        .then((wiki) => {
            callback(null, wiki)
        })
        .catch((err) => {
            callback(err);
        });
    },

    getOnlyPublicWikis(callback) {

        return Wiki.all({where: {private: false}})
         .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        });
    },

    getOnlyPrivateWikis(callback) {

        return Wiki.all({where: {private: true}})
         .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        });
    },

    getAllWikis(id, callback) {
      // includes private and/or public wikis, and include collaborator here as well
        return Wiki.all({
            include: [{
                model: Collaborator,
                as: "collaborators",
                attributes: [
                    "userId",
                    "id"
                ]
                }]
            }
        )
        .then((wikis) => {

          callback(null, wikis.filter(wiki => {
            if (wiki.private && !wiki.collaborators.find(c => c.userId === id)) {
              return false;
            }
            return true;
          }));
        })
        .catch((err) =>{
            callback(err);
        });
    },


    addWiki(newWiki, callback) {

        return Wiki.create(newWiki)
        .then((wiki) => {
            callback(null, wiki)
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteWiki(req, callback) {

      return Wiki.findById(req.params.id)
      .then((wiki) => {
           const authorized = new Authorizer(req.user, wiki).destroy();
           if(authorized) {
              wiki.destroy()
              .then((res) => {
                  callback(null, wiki);
              });
          }
          else {
              req.flash("notice", "You are not authorized to do that");
              callback(401);
          }
        })
        .catch((err) => {
            callback(err);
        });
    },

    updateWiki(id, updatedWiki, callback) {

        return Wiki.findById(id)
        .then((wiki)=> {
            if(!wiki){
                return callback("Wiki not found");
            }

            wiki.update(updatedWiki, {
                fields: Object.keys(updatedWiki)
            })
            .then(() => {
                callback(null, wiki);
            })
            .catch((err) => {
                callback(err);
            });
        });
    },

    updateWikiPrivacy(id, updatedPrivacy, callback) {

        return Wiki.findAll({where: {userId: id}})
        .then((wikis)=> {

            for (let i = 0; i < wikis.length; i++) {

                wikis[i].update({private: updatedPrivacy}, {fields: ['private']});

            }
            return wikis

            callback(null, wikis)
                })
                .catch((err) => {
                    callback(err);
                });
        }
}
