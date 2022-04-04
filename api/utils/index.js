const { isValidObjectId } = require("mongoose");

const typeInputIncorrect = function (req) {
  if (req) {
    if (!(req.body && req.body.country)) {
      return true;
    }
  }
  return false;
};
const isRequiredEmpty = function (value) {
  if ([null, "", undefined].includes(value)) {
    return true;
  }

  return false;
};
const nonNegative = function (value) {
  if (value < 0) {
    return false;
  }
  return true;
};
const ageRange = function (value) {
  if (value > 16 && value < 70) {
    return false;
  }

  return true;
};

const checkYear = function (value) {
  return value > new Date().getFullYear();
};

const validObjectId = function (value) {
  if (isValidObjectId(value)) {
    return true;
  }
  return false;
};

const isValid = function (req) {
  let hasErrors = {};
  if (checkYear(req.year)) {
    hasErrors.year = "Year must be realistic";
  }

  if (isRequiredEmpty(req.country)) {
    hasErrors.country = "Country must be valid";
  }

  if (req.age && ageRange(req.age)) {
    hasErrors.age = "Age must be between 16 and 70";
  }

  if (req.players && req.players.length) {
    hasErrors.players = [];
    req.players.forEach(function (player) {
      if (isRequiredEmpty(player.name)) {
        hasErrors.players.push("Name must be present");
      }
    });
  }

  return Object.keys(hasErrors).length > 0 ? hasErrors : null;
};

module.exports = {
  typeInputIncorrect,
  isRequiredEmpty,
  nonNegative,
  ageRange,
  validObjectId,
  checkYear,
  isValid,
};
