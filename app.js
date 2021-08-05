const dateInput = document.querySelector("#input-date");
const inputButton = document.querySelector("#input-button");
const errMsg = document.querySelector(".err");
const resMsg = document.querySelector(".result-text");
const image = document.querySelector(".cake-img");
var format = "YYYY-MM-DD";

const palindromeCheck = (date) => {
	const splitDate = date.split("");
	return splitDate.reverse().join("") === date;
};
const nearestPalindrome = (date) => {
	if (Number(date.substr(0, 4) < 2001)) {
		return "2001-10-02";
	} else {
		var newDate =
			date.substr(0, 4) +
			"-" +
			date.substr(2, 2).split("").reverse().join("") +
			"-" +
			date.substr(0, 2).split("").reverse().join("");
		return newDate;
	}
};

const daysMissed = (newDate, oldDate) => {
	const yearDiff = Number(newDate.substr(0, 4)) - Number(oldDate.substr(0, 4));
	const monthDiff = Number(newDate.substr(4, 2)) - Number(oldDate.substr(4, 2));
	const dayDiff = Number(newDate.substr(6, 2)) - Number(oldDate.substr(6, 2));

	var total = 365 * yearDiff + monthDiff * 30 + dayDiff;
	if (Math.abs(monthDiff) > 11) {
		total = 365 * yearDiff + monthDiff + dayDiff * 30;
		format = "YYYY-DD-MM";
	}

	return Math.abs(total);
};

const clickHandler = () => {
	if (dateInput.value != "") {
		const date = dateInput.value.split("-");
		errMsg.innerText = "";
		var newDate1 = date.join(""); // checking for YYYY-MM-DD
		var newDate2 = date[0] + date[2] + date[1]; //checking for YYYY-DD-MM
		var newDate3 = date[1] + date[2] + date[0]; //checking for MM-DD-YYYY
		var newDate4 = date[2] + date[1] + date[0]; //checking for DD-MM-YYYY
		image.src = "gear.gif";
		setTimeout(() => {
			image.src = "birthday.svg";
			if (palindromeCheck(newDate1)) {
				resMsg.innerText =
					"Your Birthday is a Palindrome in YYYY-MM-DD format.";
			} else if (palindromeCheck(newDate2)) {
				resMsg.innerText =
					"Your Birthday is a Palindrome in YYYY-DD-MM format.";
			} else if (palindromeCheck(newDate3)) {
				resMsg.innerText =
					"Your Birthday is a Palindrome in MM-DD-YYYY format.";
			} else if (palindromeCheck(newDate4)) {
				resMsg.innerText =
					"Your Birthday is a Palindrome in DD-MM-YYYY format.";
			} else {
				const nearestDate = nearestPalindrome(newDate1);
				const dayMissed = daysMissed(nearestDate.split("-").join(""), newDate1);
				resMsg.innerText = `Your nearest Palindrome birthdate is ${nearestDate}, Missed it by ${dayMissed}days in ${format} format`;
			}
		}, 3000);
	} else {
		errMsg.innerText = "Please Enter a Date.";
	}
};

inputButton.addEventListener("click", clickHandler);
