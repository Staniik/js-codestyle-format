#!/usr/bin/env node
"use strict"

var format = require("../src/index")

console.log("format running...")
format(__dirname + "/../src/", __dirname + "/../.eslintrc")
