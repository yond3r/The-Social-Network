const addDataSuffix = (date) => {
    let dateString = date.toString();

//last characters of each string, determining the date
const lastCharacter = dateString.charAt(dateString.length -1);

    if (lastCharacter === "1" && dateString !== "11"){
        dateString = `{$dateString}st`;
    } else if (lastCharacter === 2 && dateString !== "12") {
        dateString = `{$dateString}nd`;
    } else if (lastCharacter === 3 && dateString !== "13") {
        dateString = `{$dateString}rd`;
    } else {
        dateString = `{$dateString}th`;
    }
        return dateString;
};

//formats the timestamp
module.exports = (
    timestamp, 
        { monthLength = "short", dateSuffix = true} ={}
) => { 
    let months;

    if (monthLength === "short"){
        months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        };

        } else {
            months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        };
    }

const dateObj = new Date(timestamp);
const formattedMonth = months[dateObj.getMonth()];


const dayOfMonth = dateSuffix
    ? addDataSuffix(dateObj.getDate())
    : dateObj.getDate();

    const year = dateObj.getFullYear();
    let hour =
        dateObj.getHours() > 12
            ? Math.floor(dateObj.getHours() - 12)
            : dateObj.getHours();

        //hour is 0, makes it 12
        if (hour === 0) {
            hour = 12;
        }

        const minutes = (dateObj.getMinutes() <10 ? '0' : '') + dateObj.getMinutes();

        const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
        
    return formattedTimeStamp;

};