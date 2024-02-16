$(function() {
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

    // Append the columns to the time block
    timeBlock.append(hourCol, textArea, saveBtn);

    // Append the time block to the container
    $('.container-fluid').append(timeBlock);
  }

  // Function to update the time block classes according to the current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); // Get current hour in 24-hour format

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to set the initial class states
  updateTimeBlocks();
  // Optionally, set an interval to update classes dynamically if the app is kept open
  setInterval(updateTimeBlocks, 60000);

  // Load saved data from localStorage
  $(".time-block").each(function() {
    var id = $(this).attr("id");
    if (localStorage.getItem(id)) {
      $(this).find(".description").val(localStorage.getItem(id));
    }
  });

  // Save button listener
  $(".saveBtn").click(function() {
    var parentId = $(this).closest('.time-block').attr("id");
    var userText = $(this).siblings(".description").val();
    localStorage.setItem(parentId, userText);
  });
});
