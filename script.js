$(function() {

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));


  for (let hour = 9; hour <= 17; hour++) {
    let displayHour = hour > 12 ? hour - 12 : hour; 
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


    timeBlock.append(hourCol, textArea, saveBtn);


    $('.container-fluid').append(timeBlock);
  }


  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); 

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


  updateTimeBlocks();

  setInterval(updateTimeBlocks, 60000);


  $(".time-block").each(function() {
    var id = $(this).attr("id");
    if (localStorage.getItem(id)) {
      $(this).find(".description").val(localStorage.getItem(id));
    }
  });

  $(".saveBtn").click(function() {
    var parentId = $(this).closest('.time-block').attr("id");
    var userText = $(this).siblings(".description").val();
    localStorage.setItem(parentId, userText);
  });
});
