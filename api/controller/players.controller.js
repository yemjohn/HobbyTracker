const mongoose = require("mongoose");
const Team = mongoose.model(process.env.TEAM_MODEL);
const {
  validObjectId,
  isValid,
  isRequiredEmpty,
  ageRange,
} = require("../utils");

module.exports.getAll = function (req, res) {
  const teamId = req.params.teamId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res.status(404).send({ message: "Object id not valid!!" });
  }
  console.log("This is the function for diplaying all teams");
  Team.findById(teamId)
    .select("players")
    .exec(function (err, teams) {
      if (err) {
        console.log("Internal Error is causing problem");
        return res
          .status(500)
          .json({ message: "Internal Error is causing problem" });
      }
      console.log("Found players");
      res.status(200).json(teams.players);
    });
};

module.exports.getOne = function (req, res) {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the team is not valid!!" });
  }
  if (!validObjectId(playerId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the player is not valid!!" });
  }

  Team.findById(teamId).exec(function (err, team) {
    if (err) {
      console.log("Internal Error is causing problem");
      return res
        .status(500)
        .send({ message: "May be the DB is empty and bugging you a lot" });
    }
    console.log("A team selected by getOne");
    res.status(200).json(team.players.id(playerId));
  });
};

module.exports.addOne = function (req, res) {
  const teamId = req.params.teamId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the team is not valid!!" });
  }

  if (!validObjectId(playerId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the player is not valid!!" });
  }

  Team.findByIdAndUpdate(
    teamId,
    { $push: { players: req.body } },
    function (err, teamAdded) {
      if (err) {
        console.log("Adding player failed for some reason", err);
        res.status(err.status).send({ error: err.message });
      } else {
        if (req && req.body.name) {
          if (isRequiredEmpty(req.body.name)) {
            return res.status(404).send({ message: "Player must have name" });
          }
        }
        console.log("Player Added", teamAdded.players);
        res.status(201).json(teamAdded);
      }
    }
  );
};

module.exports.updateOne = function (req, res) {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the team is not valid!!" });
  }
  if (!validObjectId(playerId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the player is not valid!!" });
  }

  Team.findOneAndUpdate(
    { _id: teamId, "players._id": playerId },
    {
      $set: {
        "players.$.name": req.body.name,
        "players.$.age": req.body.age,
      },
    },
    function (err, editPlayer) {
      if (err) {
        console.log("Error while updating players");
        return res.status(404).json({
          msg: "Error while adding players in addOne player function",
        });
      }
      if (req && req.body.name) {
        if (isRequiredEmpty(req.body.name)) {
          return res.status(404).send({ message: "Player must have name" });
        }
      }
      console.log("Player is added");
      res.status(201).json({ message: "Edited Succcesfully" });
    }
  );
};

module.exports.deleteOne = function (req, res) {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the team is not valid!!" });
  }
  if (!validObjectId(playerId)) {
    console.log("Object id not valid!");
    return res
      .status(404)
      .send({ message: "Object id for the player is not valid!!" });
  }
  Team.findOneAndUpdate(
    { _id: teamId },
    { $pull: { players: { _id: playerId } } },
    { new: true },
    function (err) {
      if (err) {
        console.log("Error while updating players");
        return res.status(404).json({ msg: "Error while deleteing player" });
      }
      console.log("Player is deleted");
      res.status(201).json({ message: "Deleted Succcesfully" });
    }
  );
};
