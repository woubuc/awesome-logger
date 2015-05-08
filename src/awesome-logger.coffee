fs = require 'fs'
path = require 'path'
colors = require 'colors'

minReportLevel = 2 # Minimum level to be logged to file
logDirectory = process.cwd() + path.sep + 'logs' # Directory for log files
useColours = yes

awesomeLogger = (reportLevel = 2, directory, noColours) ->
	minReportLevel = reportLevel
	if directory?
		if typeof directory is 'boolean'
			useColours = not noColours
		else
			logDirectory = directory if directory?

	if noColours?
		useColours = not noColours

	log = (str, type = 0, overrideSave = no) ->
		# Set log colour and prefix
		logStr = str
		switch type
			when 1 
				logStr = str.green if useColours
			when 2 
				str = '[WARN] ' + str
				logStr = str.yellow if useColours
			when 3 
				str = '[ERROR] ' + str
				logStr = str.red if useColours
			when 4 
				str = '[CRITICAL] ' + str
				logStr = str.bold.bgRed.white if useColours
			else str

		# Log to console
		console.log logStr

		# Stop logging if no writing to file is required
		return false if overrideSave or type < minReportLevel

		# Get date and time
		d = new Date()
		dateStr = d.getFullYear() + '-' + 
			(if d.getMonth() < 10 then 0 else '') + d.getMonth() + '-' + 
			(if d.getDate() < 10 then 0 else '') + d.getDate()
		timeStr = (if d.getHours() < 10 then 0 else '') + d.getHours() + ':' + 
			(if d.getMinutes() < 10 then 0 else '') + d.getMinutes() + ':' + 
			(if d.getSeconds() < 10 then 0 else '') + d.getSeconds()
		
		# Write to file
		logFile = [logDirectory, path.sep, dateStr, '.txt'].join('')
		fs.appendFile logFile, timeStr + ': ' + str + '\r\n', (error) ->
			if error then log error.message, 3, yes

	return log

module.exports = awesomeLogger