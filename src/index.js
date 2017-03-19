const format = require("prettier-eslint")
var fs = require("fs")
var recursive = require("recursive-readdir")

/**
 * Formátuje js souboru ve složce dir dle pravidel lintu v json souboru eslintrcPath
 * a konfigurace prettier prettierOptions
 * @param  {[type]} dir                  [description]
 * @param  {[type]} eslintrcPath         [description]
 * @param  {Object} [prettierOptions={}] [description]
 * @return {[type]}                      [description]
 */
function formatDir(dir, eslintrcPath, prettierOptions = {}) {
    recursive(dir, function(err, files) {
        files.map(filePath => {
            var fileParts = filePath.split(".")
            if (fileParts.length) {
                var suffix = fileParts[fileParts.length - 1]
                if (suffix == "js") {
                    formatFile(filePath, eslintrcPath)
                }
            }
        })
    })
}

function formatFile(filePath, eslintrcPath, prettierOptions) {
    var sourceCode = fs.readFileSync(filePath, "utf8")
    var eslintConfig = fs.readFileSync(eslintrcPath, "utf8")

    const options = {
        text            : sourceCode,
        eslintConfig    : JSON.parse(eslintConfig),
        prettierOptions : prettierOptions
    }
    const formatted = format(options)
    fs.writeFileSync(filePath, formatted, "utf8")
}

module.exports = formatDir
