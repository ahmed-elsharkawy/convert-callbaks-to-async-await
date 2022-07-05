const helpers = require("./helper");

// node index.js add title=todo1 body=body1
// node index.js edit id=3 title=todo33 body=body33
// node index.js remove id=2
//node index.js list type=all
//node index.js check id=1
//

const PATH = process.env.FILE_PATH || "./db.json";

function main(cmdArg) {
  helpers.checkExistingFile(PATH);
  const [, , operation, ...options] = cmdArg;
  const parsedOptions = helpers.parseArgs(options);

  switch (operation) {
    case "add":
      helpers.add(parsedOptions);
      break;
    case "edit":
      helpers.edit(parsedOptions);
      break;
    case "list":
      helpers.list(parsedOptions);
      break;
    case "remove":
      helpers.remove(parsedOptions);
      break;
    case "check":
      helpers.check(parsedOptions);
      break;
  }
}

main(process.argv);
