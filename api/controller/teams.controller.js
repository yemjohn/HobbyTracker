const mongoose = require("mongoose");
const { validObjectId, isValid } = require("../utils");
const Team = mongoose.model(process.env.TEAM_MODEL);
module.exports.getAll = function (req, res) {
  Team.find().exec(function (err, teams) {
    if (err) {
      console.log("Internal Error is causing problem");
      res.status(500).json({ message: "Internal Error is causing problem" });
      return;
    }
    console.log("total teams found:", teams.length);
    res.status(200).json(teams);
  });
};

module.exports.getOne = function (req, res) {
  const teamId = req.params.teamId;
  if (!validObjectId(teamId)) {
    console.log("Object id not valid!");
    return res.status(404).send({ message: "Object id not valid!!" });
  }
  Team.findById(teamId).exec(function (err, team) {
    if (err) {
      res.status(500).json({ err: err.message });
    }
    if (!team) {
      console.log("There is no team with that object id");
      res.status(404).send({ message: "There is no team with that object id" });
    } else {
      console.log("A team selected", team);
      res.status(200).json(team);
    }
  });
};
module.exports.addOne = function (req, res) {
  const hasErrors = isValid(req.body);
  if (hasErrors) return res.status(400).json({ msg: hasErrors });

  Team.create(req.body, function (err, teamAdded) {
    if (err) {
      console.log("Adding team failed for invalid input", err);
      res.status(404).send({ error: "Adding team failed for invalid input" });
    } else {
      console.log(teamAdded);
      res.status(201).json(teamAdded);
    }
  });
};

module.exports.deleteOne = function (req, res) {
  const teamId = req.params.teamId;
  if (!validObjectId(teamId)) {
    console.log("not valid id is provided");
    return res.status(404).json({ message: "not valid id is provided" });
  }

  Team.findByIdAndDelete(teamId).exec(function (err, teamRemoved) {
    console.log("removing team on progress");
    if (err) {
      console.log("Internal error fetching team ", err);
      return res.status(500).json({ err: "Internal error fetching team " });
    }
   
    if (teamRemoved == null) {
      return res.status(404).json("There is no team with the specified ID");
    }
    console.log("matching team is found and automatically removed");
    res.status(201).json({msg: "matching team is found and automatically removed"});
  });
};

module.exports.updateOne = function (req, res) {
  const teamId = req.params.teamId;
  if (!validObjectId(teamId)) {
    console.log("not valid id is provided");
    return res.status(404).json({ message: "not valid id is provided" });
  }
  const hasErrors = isValid(req.body);
  if (hasErrors) return res.status(400).json({ msg: hasErrors });
  let updateTeam = {};
  updateTeam.country = req.body.country;
  updateTeam.year = req.body.year;
  updateTeam.color = req.body.color;
  Team.findByIdAndUpdate(
    teamId,
    {
      country: updateTeam.country,
      year: updateTeam.year,
      color: updateTeam.color,
    },
    function (err, teamUpdate) {
      if (err) {
        console.log("Team details can't be updated");
        return res.status(500).json({ err: "Team details can't be updated because of internal error" });
      }
      if(!teamUpdate) {
        return res.status(500).json({ err: "No team was found with that specified object id" });
      }
      console.log("Team details successfully updated");
      res.status(201).json(teamUpdate);
    }
  );
};
