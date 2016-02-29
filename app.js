var employeeArray = [];

$(document).ready(function(){

  //Works with totalSalCalc to display information from forms
  $('#employeeForm').on('submit', function(event){
          //Prevents page from being reloded upon submit
          event.preventDefault();
          //creates a temporary employee to push into the array
          var Employee ={};
          //Instanciates employee object
          $.each($("#employeeForm").serializeArray(), function(i,field){
            Employee[field.name] = field.value;
      });

    //Erases form cache
    $('#employeeform').find('input[type="text"]').text('');
    //
    //TODO: strip $ and , from salary string
    //
    Employee.salary = parseInt(Employee.salary);
    Employee.monthlyPay = Math.round(Employee.salary/12);


    //Pushes employee into the array if valid
    if(invalidEntry(Employee)){
      alert("Please enter a valid application");
    } else{
      employeeArray.push(Employee);
      //See funcs below
      totalMonthCalc(employeeArray);
      displayRecentSubmit(Employee);
    }

  });

  $('.container').on('click', '.removeEmp',function(){
    //target employee from array
    //TODO: wrong target!!!!!!!!!
      var $empIndex = $(this).parent().attr('id');

      employeeArray[$empIndex]={monthlyPay:0};
    //remove from array
      $(this).parent().remove();
      totalMonthCalc(employeeArray);
  });

  //Shows blank total of salaries before any submits
  totalMonthCalc(employeeArray);

});





//
// function to calculate and display total salary to dom
function totalMonthCalc(placeholderArray){
    var monthTotal= 0;

    //Loops through employee array, addingto monthTotal
    for (var i = 0; i < employeeArray.length; i++){
      var workingEmployee = placeholderArray[i];

      monthTotal += parseInt(workingEmployee.monthlyPay);
    }


    //displays monthTotal as a h2 element above form
    $('.running-total').text("Monthly pay for employees entered: $" + monthTotal);

}

//Appends recent application to the dom
//**includes button to remove element (class="removeEmp")**
function displayRecentSubmit(employee){

    $('.container').append('<div class="recent-submit" id="'+(employeeArray.length-1)+'">');
    var $sub = $('.container').children().last();
    $sub.append('<h3>'+employee.name+'</h2>');
    $sub.append('<p>Employee Number: '+employee.number+'</p>');
    $sub.append('<p>Job title: '+employee.job+'</p>');
    $sub.append('<p>Yearly Salary: $'+employee.salary+'</p>');
    $sub.append('<p>Monthly Pay: $'+employee.monthlyPay+'</p>');
    $sub.append('<button class="removeEmp"> Remove '+employee.name+'</button>');
  }

//returns error value of 1 if any values are undefined
function invalidEntry(applicant){
  var error = 0;
  if( applicant.name == undefined || isNaN(applicant.monthlyPay) || applicant.monthlyPay == undefined || isNaN(applicant.salary) || applicant.salary == undefined || applicant.job == undefined )
    {
    error = 1;
  }
  return error;
}
