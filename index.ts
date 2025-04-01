const core = require('@actions/core');

try {
	const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	let today: number = new Date().getDay();

	if(today == 0) {
		today = 7; // Correcting 'today' to range from 1-7, Monday-Sunday.
	}
	
	const blockedDays: string = core.getInput('blocked_days', { required: false }).replace("-", "").trim().toLowerCase();
	
	for(const dayLine of blockedDays.split("\n")) {
		for(let day of dayLine.split(",")) {
			day = day.trim();
			if((day === today.toString() || day === days[today])) { // if day is blocked

				if(!isNaN(Number(day))) {
					day = days[day]; // If day is a number, convert it to the name of the day in order to display it in the error and output.
				}
				throw new Error(`The current workflow will be cancelled as it is not allowed to be run on a ${day[0].toUpperCase() + day.slice(1)}.`);
			}
		}
	}
	
} catch(error) {
	core.setFailed(error.message);
	core.setOutput("cancelled", true);
	core.setOutput("cancel_reason", error.message);
	process.exit(1);
}

core.setOutput("cancelled", false);
console.log("The current workflow was not run on a blocked weekday, so it was not cancelled.");
