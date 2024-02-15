
$(function () {
   // Display the current date in the header
   $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

   // Generate time blocks for each work hour (9AM to 5PM)
   for (let hour = 9; hour <= 17; hour++) {
     let displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
     let amPm = hour >= 12 ? 'PM' : 'AM';
     let timeBlock = $('<div>')
       .addClass('row time-block')
       .attr('id', `hour-${hour}`);
     let hourCol = $('<div>')
       .addClass('col-2 col-md-1 hour text-center py-3')
       .text(`${displayHour}${amPm}`);
     let textArea = $('<textarea>')
       .addClass('col-8 col-md-10 description')
       .attr('rows', '3');
     let saveBtn = $('<button>')
       .addClass('btn saveBtn col-2 col-md-1')
       .attr('aria-label', 'save')
       .html('<i class="fas fa-save" aria-hidden="true"></i>');
});
