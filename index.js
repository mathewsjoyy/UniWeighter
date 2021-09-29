// Check if user has entered any values and pressed submit
document.getElementById("submit").onclick = function(e){
    calculateResults(e); // Call the function
};

// Check if download button is pressed
document.getElementById("download").onclick = function(e){
    generateCSV(e); // Call the function
};

// Modal close button
var modalClose = document.getElementsByClassName('modal-close')[0]; // get first instance
modalClose.onclick = function(){
    modal.style.display = 'none';
};
window.onclick = function(event){ // Give option to close modal by clicking on dark background
    if(event.target.className == 'modal-background'){
        modal.style.display = 'none';
    }
};

// Get csv data
function generateCSV(e){
    e.preventDefault();

    const formdata = new FormData(document.getElementById('gradeForm'));
    const formObj = Object.fromEntries(formdata);
    const len = Object.keys(formObj).length/2;
    let formValues = '';
    let emptyCount = 0;

    for(let i=1; i<= len; i++){
        // comma separated values and break line
        let subValue = '';

        if(formObj['grade'+i] != '' || formObj['credit'+i] != ''){ // see if grades have been inputted or not
            subValue = 'Assignment ' + i;
        }

        // Keep track of entries where user entered 0 values
        formObj['credit'+i] == '' ? emptyCount += 1 : emptyCount=emptyCount;
        formObj['grade'+i] == '' ? emptyCount += 1 : emptyCount=emptyCount;

        formValues += subValue+','+formObj['grade'+i] +','+formObj['credit'+i]+ "\r\n";
    }

    if(emptyCount == 14){ // Check if user didn't enter any values at all (dont download csv)
        var modal = document.getElementById('modal');
        modal.style.display = 'block'; // show the modal if if condition is met
    }else{
        console.log(formValues); // debug
        downloadCSV(formValues);
    }
    return;
};

// Download the csv file with data
function downloadCSV(formValues){
    const columnNames = "Assignment/Module, Grade (%), Weight (Credits)";
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += columnNames + "\r\n";
    csvContent += formValues + "\r\n";

    const encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my-grade-data.csv");
    document.body.appendChild(link);
    link.click();
    return;
};

// Grade calculation function
function calculateResults(e){
    e.preventDefault();

    const UIgrade1 = document.getElementById("grade1").value, UIcredit1 = Number(document.getElementById("credit1").value);
    const UIgrade2 = document.getElementById("grade2").value, UIcredit2 = Number(document.getElementById("credit2").value);
    const UIgrade3 = document.getElementById("grade3").value, UIcredit3 = Number(document.getElementById("credit3").value);
    const UIgrade4 = document.getElementById("grade4").value, UIcredit4 = Number(document.getElementById("credit4").value);
    const UIgrade5 = document.getElementById("grade5").value, UIcredit5 = Number(document.getElementById("credit5").value);
    const UIgrade6 = document.getElementById("grade6").value, UIcredit6 = Number(document.getElementById("credit6").value);
    const UIgrade7 = document.getElementById("grade7").value, UIcredit7 = Number(document.getElementById("credit7").value);

    // Find weighted averages
    const weight_grade = (UIgrade1*UIcredit1 + UIgrade2*UIcredit2 + UIgrade3*UIcredit3 + UIgrade4*UIcredit4 + UIgrade5*UIcredit5 + UIgrade6*UIcredit6 + UIgrade7*UIcredit7) /
                        (UIcredit1 + UIcredit2 + UIcredit3 + UIcredit4 + UIcredit5 + UIcredit6 + UIcredit7);

    console.log(weight_grade); // for debugging

    // Find formal grade
    var formal_grade;

    if(weight_grade < 40 && weight_grade >= 0){
        formal_grade = "Fail :(";
    }
    else if(weight_grade >= 40 && weight_grade <= 49){
        formal_grade = "3rd";
    }
    else if(weight_grade >= 50 && weight_grade <= 59){
        formal_grade = "2:2";
    }
    else if(weight_grade >= 60 && weight_grade <= 69){
        formal_grade = "2:1";
    }
    else if(weight_grade >= 70 && weight_grade <= 100){
        formal_grade = "First :)";
    }
    else{
        formal_grade = "Out of grade range (0% - 100%)"
    }

    document.getElementById("averageGrade").innerHTML = "<i class='fa fa-percentage'></i> " + parseFloat(weight_grade).toFixed(2);
    document.getElementById("formalGrade").innerHTML = "<i class='fas fa-graduation-cap'></i> " + formal_grade;
    return;
};

