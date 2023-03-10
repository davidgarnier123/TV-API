// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
var moment = require('moment');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// Create new instance of the express server
var app = express();

const https = require('https');

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

const formatDate = "YYYYMMDDHHmmss";
const xmlURL = 'https://xmltvfr.fr/xmltv/xmltv_tnt.xml';

app.get("/getPrograms", async (req, response) => {
  try {
    const xmlData = await parseXML(xmlURL);
    const programs = formatPrograms(xmlData);
    response.send({ data: programs });
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
});

async function parseXML(url) {
  const data = await get(url);
  return new Promise((resolve, reject) => {
    parser.parseString(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function formatPrograms(xmlData) {
  const { tv: { channel, programme } } = xmlData;
  const channels = channel.map(chan => ({
    id: chan.$.id,
    name: chan['display-name'][0],
    icon: chan.icon[0].$.src,
    programs: [],
  }));
  const programs = programme.map(prog => {
    const {
      $: { channel, start, stop },
      title: [{ _: name }],
      icon,
      rating: [{ value: [rating] }],
      category: [{ _: cat }],
      desc: [{ _: desc }],
    } = prog;
    return {
      name,
      start: moment(start.substring(0, formatDate.length), formatDate).unix(),
      end: moment(stop.substring(0, formatDate.length), formatDate).unix(),
      channel,
      icon: icon ? icon[0].$.src : null,
      rating,
      cat,
      desc,
    };
  });
  channels.forEach(channel => {
    programs
      .filter(prog => prog.channel === channel.id)
      .forEach(prog => channel.programs.push(prog));
  });
  return channels;
}

async function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        let data = '';
        res.on('data', data_ => {
          data += data_.toString();
        });
        res.on('end', () => {
          resolve(data);
        });
      } else {
        reject(new Error(`Failed to get ${ url }: ${ res.statusCode }`));
      }
    });
  });
}