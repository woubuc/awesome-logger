var awesomeLogger, colors, fs, logDirectory, minReportLevel, path, useColours;

fs = require('fs');

path = require('path');

colors = require('colors');

minReportLevel = 2;

logDirectory = process.cwd() + path.sep + 'logs';

useColours = true;

awesomeLogger = function(reportLevel, directory, noColours) {
  var log;
  if (reportLevel == null) {
    reportLevel = 2;
  }
  minReportLevel = reportLevel;
  if (directory != null) {
    if (typeof directory === 'boolean') {
      useColours = !noColours;
    } else {
      if (directory != null) {
        logDirectory = directory;
      }
    }
  }
  if (noColours != null) {
    useColours = !noColours;
  }
  log = function(str, type, overrideSave) {
    var d, dateStr, logFile, logStr, timeStr;
    if (type == null) {
      type = 0;
    }
    if (overrideSave == null) {
      overrideSave = false;
    }
    logStr = str;
    switch (type) {
      case 1:
        if (useColours) {
          logStr = str.green;
        }
        break;
      case 2:
        str = '[WARN] ' + str;
        if (useColours) {
          logStr = str.yellow;
        }
        break;
      case 3:
        str = '[ERROR] ' + str;
        if (useColours) {
          logStr = str.red;
        }
        break;
      case 4:
        str = '[CRITICAL] ' + str;
        if (useColours) {
          logStr = str.bold.bgRed.white;
        }
        break;
      default:
        str;
    }
    console.log(logStr);
    if (overrideSave || type < minReportLevel) {
      return false;
    }
    d = new Date();
    dateStr = d.getFullYear() + '-' + (d.getMonth() < 10 ? 0 : '') + d.getMonth() + '-' + (d.getDate() < 10 ? 0 : '') + d.getDate();
    timeStr = (d.getHours() < 10 ? 0 : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? 0 : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? 0 : '') + d.getSeconds();
    logFile = [logDirectory, path.sep, dateStr, '.txt'].join('');
    return fs.appendFile(logFile, timeStr + ': ' + str + '\r\n', function(error) {
      if (error) {
        return log(error.message, 3, true);
      }
    });
  };
  return log;
};

module.exports = awesomeLogger;
