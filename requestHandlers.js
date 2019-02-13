//var querystring = require("querystring");
var fs = require("fs");
var mysql = require("mysql");
let mysql_table;

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  //读取HTML文件内容
  fs.readFile("./index.html", "utf-8", function(err, data) {
    if (err) {
      console.error(err);
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
}

function api(response, postData) {
  fs.readFile("./apiInstance.html", "utf-8", function(err, data) {
    if (err) {
      console.error(err);
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
}
function env(response, postData) {
  fs.readFile("./MySQL.html", "utf-8", function(err, data) {
    if (err) {
      console.error(err);
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      let top = 25;
      // let top1 = 20;
      // Object.keys(process.env).map((item)=>{
      //   top1 +=4
      //       response.write(`
      //       <div style="position:absolute;top:${top1}%;padding:0 36px">
      //       <div> ${item} : ${process.env[item]} </div>
      //       </div>
      //       `)
      //     })
      
      if(Object.keys(process.env).indexOf('MYSQL_HOST') > -1){
        var db_config = {
          host: process.env['MYSQL_HOST'],
          user: process.env['MYSQL_USER'],
          password: process.env['MYSQL_PASS'],
          database: process.env['MYSQL_DATABASE'],
          port: process.env['MYSQL_PORT']
        };
        var connection = mysql.createConnection(db_config);
        connection.connect();
        connection.query('show tables ;', function (error, results, fields) {
          if (error) console.log(error);
          // response.write('-------->'+results);
          mysql_table = results;
        });
        if(mysql_table){

          mysql_table.map((item,index)=>{
            response.write(
              `<div style="position:absolute;top:15%;padding:0 36px">
              数据库已连接:
              <div style="border:1px solid #eee">${JSON.stringify(item)}</div>
              </div>
             `
            );
          })
          
          response.write(
            `<div style="position:absolute;top:${top}%;padding:0 36px">
            数据库连接信息:
            <div style="border:1px solid #eee">MYSQL_HOST: ${process.env['MYSQL_HOST']}</div>
            <div style="border:1px solid #eee">MYSQL_DATABASE: ${process.env['MYSQL_DATABASE']}</div>
            <div style="border:1px solid #eee">MYSQL_USER: ${process.env['MYSQL_USER']}</div>
            <div style="border:1px solid #eee">MYSQL_PASSWORD: ${process.env['MYSQL_PASS']}</div>
            <div style="border:1px solid #eee">MYSQL_PORT: ${process.env['MYSQL_PORT']}</div>
            </div>`
          );
          //所有了解信息
          // Object.keys(process.env).map((item)=>{
          //   response.write(`
          //   <div> ${item}: ${process.env[item]}  </div>
          //   `)
          // })
        }
        else{
          response.write(
            `<div style="position:absolute;top:${top}%"">数据库未连接。</div>`
          );
        }
      }
      else{
        response.write(
          `<div style="position:absolute;top:${top}%;padding:0 36px">数据库未连接。</div>`
        );
      }
      response.write(data);
      // response.write(`<div style="position:absolute;top:15%">${JSON.stringify(Object.keys(process.env))}</div>`)
      response.end();
    }
  });
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("You've sent: " + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.api = api;
exports.env = env;
