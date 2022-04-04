const express= require("express");
const router= express.Router();
const teamsController= require("../controller/teams.controller")
const playerController= require("../controller/players.controller")

router.route("/teams")
    .get(teamsController.getAll)
    .post(teamsController.addOne)

router.route("/teams/:teamId")
    .get(teamsController.getOne)
    .delete(teamsController.deleteOne)
    .put(teamsController.updateOne)
    .post(playerController.addOne)

router.route("/teams/:teamId/players")
    .get(playerController.getAll)
    
router.route("/teams/:teamId/player/:playerId")
    .get(playerController.getOne)
    .put(playerController.updateOne)
    .delete(playerController.deleteOne)




module.exports= router;