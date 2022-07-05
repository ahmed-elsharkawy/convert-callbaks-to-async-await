var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
// const fs = require("fs");

function asyncExists(path){
  return new Promise((res, rej) => {
    fs.exists(path, (exists) => {
      if(exists) res(exists);

    })
  })
}

function asyncWrite(path, data){
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if(!err) return res(true);
    })
  })
}

async function checkExistingFile(path) {
  const exists = await asyncExists(path);
  if (!exists) {
    asyncWrite(path, JSON.stringify([]));
  }
}

function parseArgs(options) {
  const parsedOptions = options.reduce((cum, elm, index, arr) => {
    const [key, value] = elm.split("=");
    cum[key] = value;
    return cum;
  }, {});
  return parsedOptions;
}

async function add(data) {
  const list = JSON.parse(await fs.readFileAsync("db.json", "utf-8"));
  if (list.length > 0) {
    data.id = list[list.length - 1].id + 1;
  } else {
    data.id = 1;
  }
  list.push(data);
  asyncWrite("db.json", JSON.stringify(list));
}

async function edit(data) {
  const list = JSON.parse(await fs.readFileAsync("db.json", "utf-8"));
  list.map((el, ind) => {
    if (el.id === data.id * 1) {
      el.title = data.title;
      el.body = data.body;
    }
  });
  asyncWrite("db.json", JSON.stringify(list));
}

async function remove(data) {
  const list = JSON.parse(await fs.readFileAsync("db.json", "utf-8"));
  list.map((el, ind, arr) => {
    if (el.id === data.id * 1) {
      arr.splice(ind, 1)
    }
  });
  asyncWrite("db.json", JSON.stringify(list));
}

async function check(data) {
  const list = JSON.parse(await fs.readFileAsync("db.json", "utf-8"));
  list.map((el, ind, arr) => {
    if (el.id === data.id * 1) {
      el.check = "checked";
    }
  });
  asyncWrite("db.json", JSON.stringify(list));
}

async function list(data) {
  const list = JSON.parse(await fs.readFileAsync("db.json", "utf-8"));
  switch (data.type) {
    case "all":
      console.log(list);
      break;
    case "checked":
      const res1 = list.filter((el) => el.check == "checked");
      console.log(res1);
      break;
    case "unchecked":
      const res2 = list.filter((el) => el.check == "unchecked");
      console.log(res2);
      break;
  }
}

module.exports = {
  add,
  edit,
  remove,
  list,
  check,
  parseArgs,
  checkExistingFile,
};
