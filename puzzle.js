(function(){
	var scene,
		objectPositions = [],
		draggable = '',
		matchOffset = 30


	$(document).ready(function() {
	    var $dragging = null;
	    var $mouseX = 0;
	    var $mouseY = 0;

	    $(document.body).on("mousemove", function(e) {
	        if ($dragging) {
	            $dragging.offset({
	                top: (parseInt(e.pageY) - $mouseY),
	                left: (parseInt(e.pageX) - $mouseX)
	            });
	        }
	    });


	    $(document.body).on("mousedown", "div", function (e) {
	        if (draggable.indexOf('|'+e.target.id+'|') > -1) {
		        $dragging = $(e.target);
		        $mouseX = parseInt(e.pageX) - parseInt($(e.target).css('left'));
		        $mouseY = parseInt(e.pageY) - parseInt($(e.target).css('top'));
		    }
	    });

	    $(document.body).on("mouseup", function (e) {
	        $dragging = null;
	    });
	});

	var puzzle = function(obj) {
		
	}
	
	puzzle.init = function(obj) {
		puzzle.scene = obj;
		puzzle.objectPositions = [];

		var cutouts = $(puzzle.scene).children("[id^=cutout]");
		for (var k=0; k<cutouts.length; k++) {
			var currentPosition = parseInt(cutouts[k].id.split('cutout')[1]);
			
			if (puzzle.objectPositions[currentPosition] === undefined) {
				puzzle.objectPositions[currentPosition] = {};
			}
			puzzle.objectPositions[currentPosition].cutout = {
															id: 'cutout'+k,
															x: $(cutouts[k]).css('top'),
															y: $(cutouts[k]).css('left'),
															}
			var piece = $('#piece'+k);
			if (piece !== undefined) {
				draggable += '|'+'piece'+k+'|';
				puzzle.objectPositions[currentPosition].piece = {
															id: 'piece'+k, 
															x: $(piece).css('top'),
															y: $(piece).css('left'),
															}
			}

		}
		console.log(puzzle.objectPositions, draggable)
		
	}

	puzzle.start = function() {
		console.log('start with '+puzzle.objectPositions.length);
		for (var i = 0; i < puzzle.objectPositions.length; i++) {
			console.log($(puzzle.objectPositions[i].piece.id))
			$('#'+puzzle.objectPositions[i].piece.id).css('top', '200px');
			$('#'+puzzle.objectPositions[i].piece.id).mousedown(function() {
				puzzle.onPuzzlePieceDown($(this));
			}).mouseup(function() {
				puzzle.onPuzzlePieceUp($(this));

			});
		}
	}

	puzzle.onPuzzlePieceUp = function(piece) {
		console.log('piece down ', parseInt(piece[0].id.split('piece')[1]));
		var index = parseInt(piece[0].id.split('piece')[1]);
		if (puzzle.objectPositions[index].cutout !== undefined) {
			var cutout = puzzle.objectPositions[index].cutout;

			if (Math.abs(parseInt($(piece[0]).css('top')) - parseInt(cutout.x)) < matchOffset &&
			 	Math.abs(parseInt($(piece[0]).css('left')) - parseInt(cutout.y)) < matchOffset) {
				console.log('match!!');
				$(piece[0]).css('top', puzzle.objectPositions[index].piece.x)
				.css('left',  puzzle.objectPositions[index].piece.y);
				draggable = draggable.split('|'+piece[0].id+'|').join();
				console.log('after match', draggable)
			}

		}
	}

	puzzle.onPuzzlePieceDown = function(piece) {
		console.log('puzzle mouse down', piece);
		//console.log(piece.draggable);
	}

	puzzle.onPuzzlePieceMatch = function() {

	}

	puzzle.onPuzzlePieceMismatch = function() {

	}

	puzzle.onPuzzleDone = function() {

	}

	window.puzzle = puzzle;
})(window)
