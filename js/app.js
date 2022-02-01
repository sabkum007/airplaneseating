function Seat(block, row, column, classSeat, seat) {
    this.block = block;
    this.row = row;
    this.column = column;
    this.classSeat = classSeat;
    this.seat = seat;
  }

var airplanecontroller = {
  init: function() {
    let seats=document.getElementById("seats");
    let row, column, block, newSeat;    
    let finalSeatresult = [];
    document.getElementById("button").addEventListener("click", function() {
      let numberofseat = document.getElementById('numberofseat').value;
      let stringRowsColumns = document.getElementById("rowsColumns").value;
	  let inputArrayRowsColumns=stringRowsColumns.substring(2, stringRowsColumns.length-2).split("],[").map(function (x) { 
      return x.split(",");
    });

    for(i = 0; i < inputArrayRowsColumns.length; i++){ //replace strings to numbers
      for(j = 0; j < inputArrayRowsColumns[i].length; j++){
        inputArrayRowsColumns[i][j] = parseInt(inputArrayRowsColumns[i][j]);
      }
    };
	
      finalSeatresult = [];
      view.clearFromDOM(seats);
	  if (airplanecontroller.isInputValid(inputArrayRowsColumns, numberofseat)===false) {return false};
      
      airplanecontroller.sortSeat(inputArrayRowsColumns, finalSeatresult);
      finalSeatresult.sort(airplanecontroller.comparator('column'));
      finalSeatresult.sort(airplanecontroller.comparator('classSeat'));

     if(finalSeatresult.length<numberofseat) {
		alert("Maximum number os feats available: "+finalSeatresult.length);
    } else {
      for(i=0; i<numberofseat; i++){
        finalSeatresult[i].seat = i+1;
      }
	  finalSeatresult.sort(airplanecontroller.comparator('row', 'column', 'block'));
      view.createTableResults(inputArrayRowsColumns, finalSeatresult);
    }

    });
  },

  comparator: function (key) {
    return function(a, b) {
      return a[key] - b[key];
    }
  },
  isInputValid: function(arrayRowsColumns, que) {
    if (arrayRowsColumns.length>8) {
      alert('Too many sections with the rows and columns!');
      document.getElementById("rowsColumns").focus();
      return false;
    }
    for(i = 0; i < arrayRowsColumns.length; i++){
      for(j = 0; j < arrayRowsColumns[i].length; j++){
        if(arrayRowsColumns[i][j]<1 || Number.isNaN(arrayRowsColumns[i][j])) {
          alert('The rows and columns must be more than 0!');
          document.getElementById("rowsColumns").focus();
          return false;
        }
      }
    }
    if (que < 1 || que % 1 != 0) {
      alert('Incorrect input!');
      document.getElementById("queue").focus();
      return false;
    }
  },

  sortSeat: function(inputArray, resultArr) {
    for(block = 1; block <= inputArray.length; block++){
      for(column = 1; column <= inputArray[block-1][0]; column++){
        for(row = 1; row <= inputArray[block-1][1]; row++){
          if(block === 1 && column === 1 && inputArray[block-1][0]>1) {
            newSeat = new Seat(block, column, row, 2);
            resultArr.push(newSeat);
          } else if(block === inputArray.length&& column === inputArray[block-1][0]&& inputArray[block-1][0]>1){
            newSeat = new Seat(block, column, row, 2);
            resultArr.push(newSeat);
          } else if(column === 1 || column === (inputArray[block-1][0])) {
            newSeat = new Seat(block, column, row, 1);
            resultArr.push(newSeat);
          } else {
            newSeat = new Seat(block, column, row, 3);
            resultArr.push(newSeat);
          }
        }
      }
    }
  },
};

var view = {
  clearFromDOM: function(element){
    while (element.firstChild) {
       element.removeChild(element.firstChild);
    }
  },
  createTableResults: function(arrInput, arrResult) {
	  let table, tr, td;
    for(i=0; i<arrInput.length; i++){
      table = document.createElement('table');
      table.setAttribute('class', 'table'+(i+1));

      for(j=0; j<arrInput[i][1]; j++) {
        tr = document.createElement('tr');
        tr.setAttribute('class', 'tr'+(j+1));
        for(z=0; z<arrResult.length; z++) {
          if(arrResult[z].block===i+1 && arrResult[z].column===j+1) {
            td = document.createElement('td');
            td.setAttribute('class', 'class'+arrResult[z].classSeat);
            if(isNaN(arrResult[z].seat)===false) {
              td.innerText=arrResult[z].seat;
            } else{
              td.innerText="";
            }
            tr.appendChild(td);
          }
        }
        table.appendChild(tr);
      }
      seats.appendChild(table);
    }
  }
}

airplanecontroller.init();
