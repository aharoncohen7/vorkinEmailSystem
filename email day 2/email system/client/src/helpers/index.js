export function setDateAndTime(dateTimeString, ){
    var parts = dateTimeString.split("T"); // מפרק את המחרוזת לשני חלקים על פי התו 'T'
    var datePart = parts[0]; // חלק הראשון שמכיל את התאריך
    var timePart = parts[1]; // חלק השני שמכיל את השעה

    // מפרקים את התאריך לשנה, חודש ויום
    var dateParts = datePart.split("-");
    var year = dateParts[0].slice(-2); // משנה את השנה לצורת שני ספרות (כך שהתוצאה תהיה "24" במקרה זה)
    var month = dateParts[1];
    var day = dateParts[2];
    
    // מרכיבים מחדש את התאריך בפורמט הרצוי (יום/חודש/שנה)
    var newDatePart = day + "/" + month + "/" + year;
    
    
    // מפרקים את החלק השני (שעות, דקות, שניות)
    var timeParts = timePart.split(":");
    var hours = timeParts[0];
    var minutes = timeParts[1];
    
    // מפרקים את השעות לתצוגה במבנה של ארבע ספרות (כגון "23")
    hours = hours.padStart(2, "0"); // מוסיף אפס במידה והמספר קטן מ־10
    var newTimePart = hours + ":" + minutes; // מרכיב מחדש את חלק השעה
    var newString = newDatePart + ", " + newTimePart; // מרכיב מחדש את המחרוזת החדשה, מופרדת בפסיק
    var relativeDate = getRelativeDate(dateTimeString); // מרכי�� מחד
  return relativeDate  + newString
}




function getRelativeDate(date) {
  //השוואה לתאריך עדכני
  const currentDate = new Date();
  const inputDate = new Date(date);
  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const oneWeek = 7 * oneDay; // milliseconds in a week

  if (timeDifference < oneDay) {
      return "Today, ";
  } else if (timeDifference < 2 * oneDay) {
      return "Yesterday, ";
  } else if (timeDifference < oneWeek) {
      // Check the day of the week
      const daysOfWeek = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "];
      return daysOfWeek[inputDate.getDay()];
  } else {
      return "last week, ";
  }
}