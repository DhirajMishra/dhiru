
function set(list){
    /*
     * returns list with no repeated entries
     */
    var set_list = [];
    for (var element in list){
        if (!(element in set_list)){
            set_list.push(element);
        }
    }
    return set_list;
}






function range(start, stop, step){
    var lstart, lstop, lstep;
    if(typeof start!='undefined')
    {
	lstart = parseInt(start,10);
    }
    if(typeof stop!='undefined')
    {
    	lstop = parseInt(stop,10);
    }	
    else
    {
        // one param defined
        lstop = lstart;
        lstart = 0;
    }

    if(typeof step!='undefined')
    {
    	lstep = parseInt(step,10);
    }else{
        lstep = 1;
    }
    if ((lstep>0 && lstart>=lstop) || (lstep<0 && lstart<=lstop)){
        return [];
    }
    var result = [];
    for (var i=lstart; lstep>0 ? i<lstop : i>lstop; i+=lstep){
        result.push(i.toString());
    }
    return result;
}


function check_sudoku(grid){
    /**
     * If grid is a valid sudoku board, so far filled-in correctly: returns true
     * else if grid is a valid sudoku board but has been filled-in incorrectly: returns false
     * else: returns 0
     *
     *  Note: returning true does not imply there is a solution for grid, see solve_sudoku.
     */
    function sanity_check(){
        /**
         * If grid is of the sudoku board format: returns true
         * Else: returns 0
         */
        if (!( grid instanceof Array && grid.length === 9 )){
            return 0;
        }
        for (var row in grid){
	    //console.log("value of "+row+"th row :: "+grid[row]+"\n");
            if (!( grid[row] instanceof Array && grid[row].length === 9 )){
                return 0;
            }
            for (var element in grid[row]){
                if (!( element in range(10) && String(element).length === 1)){
                    return 0;
                }
            }
        }
        return true;
    }

    function no_repeats_check(numbers){
        return numbers.length === set(numbers).length;
    }

    function row_check(row){
        var non_zero_in_row = [];
        for (var col in range(9)){
            if (grid[row][col] !==0){
                non_zero_in_row.push(grid[row][col]);
            }
        }
        return no_repeats_check(non_zero_in_row);
    }

    function col_check(col){
        var non_zero_in_col = [];
        for (var row in range(9)){
            if (grid[row][col] !==0){
                non_zero_in_col.push(grid[row][col]);
            }
        }
        return no_repeats_check(non_zero_in_col);
    }

    function square_check(start_row, start_col){
        var non_zero_in_square = [];
        for (var row in range(start_row, parseInt(start_row,10)+3)){
            for (var col in range(start_col, parseInt(start_col,10)+3)){
                if (grid[row][col] !== 0){
                    non_zero_in_square.push(grid[row][col]);
                }
            }
        }
        return no_repeats_check(non_zero_in_square);
    }
            
    if (! sanity_check()){
        return 0;
    }
    for (var row in range(9)){
        if (! row_check(row)){
            return false;
        }
    }
    for (var col in range(9)){
        if (! col_check(col)){
            return false;
        }
    }
    for (var start_row in range(0,9,3)){
        for (var start_col in range(0,9,3)){
            if (!square_check(start_row,start_col)){
                return false;
            }
        }
    }
    return true;
}


function solve_sudoku(grid){
    /**
     * If grid is a valid board and it can be completed: returns an example completed grid
     * Else if grid is a valid board, but there are no possible solutions: returns false
     * Else: returns 0
     */
    debugger;

    var check_grid = check_sudoku(grid);
    if (! check_grid){
        return check_grid;
    }
    
    //recursion on the empty squares
    for (var row in range(9)){
        for (var col in range(9)){
            if (grid[row][col] === 0){
                //this is the first empty square
                for (var k in range(1,10)){
                    grid[row][col] = k;
                    var solved = solve_sudoku(grid);
                    if (solved){
                        //we've found a solution recursively
                        return solved;
                    }
                //reset the empty square, there's no way to fill it in.
                grid[row][col] = 0;
                return false;
                }
            }
        }
    }

    //there are no empty squares and check_sudoku is true, so grid is a solution.
    return grid;
}

var grid = [
		[0,0,4,5,0,3,0,7,0],
		[0,0,0,0,0,0,3,1,0],
		[3,5,0,0,0,9,2,0,0],
		[0,0,0,0,2,0,9,3,7],
		[6,0,9,0,0,0,4,0,8],
		[4,7,2,0,0,0,0,0,0],
		[0,0,1,0,0,0,0,5,2],
		[0,4,5,0,0,0,0,0,0],
		[0,6,0,8,0,1,7,0,0]
	];

console.log("Result  :: "+solve_sudoku(grid));
console.log("\n\n\n");
console.log(grid);
