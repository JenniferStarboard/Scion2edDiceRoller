function createCircle(center, shade){
    let out = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    
    out.setAttribute('cx', center);
    out.setAttribute('cy', '50');
        
    out.setAttribute('r', '20');
    out.setAttribute('stroke', shade);
    out.setAttribute('stroke-width', '1');
    out.setAttribute('fill', shade);

    return out
}


function rollDice(){
    function createText(center, num) {
        let out = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        out.setAttribute('x', center);
        out.setAttribute('y', '55');
        out.setAttribute('textLength', '30');
        out.setAttribute('lengthAdjust', 'spacingAndGlyphs');
        out.setAttribute('fill', 'white');

        out.innerHTML = num;

        return out
    }

    function recursionDice(arrTens, history, round) {
        if(round > 10) {
            return
        }

        let newRolls = arrTens.map( n0 => Math.floor(Math.random()*(11 - 1) + 1) );
        newRolls.forEach( function(n0) { this.push(n0); }, history);
        
        let explodes = newRolls.filter(function(n0) {return n0 === 10});
        
        if(explodes.length > 0) {
            recursionDice(explodes, history, round + 1);
        } else {
            return
        }

    }

    const textStarts = [15, 65, 115, 165, 215, 265, 315, 365, 415, 465, 515, 565, 615]
    
    let svg = document.getElementById('show_1');
    let skills = parseInt(document.getElementById('skills').value);
    let atr = parseInt(document.getElementById('attributes').value);
    let spec = parseInt(document.getElementById('specialty').value);

    let num = skills + atr + spec;

    let numbers = [];

    //Removes exsisting numbers from a previous roll
    let check = Array.from(svg.children);
    check = check.filter(function(n0) {return n0.hasAttribute('textLength')});
    check.forEach( n0 => n0.remove() );

    let explodeCheck = document.getElementById('show_2');
    if(explodeCheck !== null) {
        explodeCheck.remove();
    }
    
    

    for(let i = 0; i < num; i++){
        numbers.push(Math.floor(Math.random()*(11 - 1) + 1));
    }

    for(let i = 0; i < numbers.length; i++){
        let t0 = createText(textStarts[i], numbers[i]);
        svg.appendChild(t0);
    }

    //Check for Tens, which explode.
    let tens = numbers.filter(function(n0) {return n0 === 10});

    if(tens.length > 0) {
        let exploded = [];
        recursionDice(tens, exploded, 0);

        //Create a new SVG and put it in HTML document
        let svg_2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg_2.setAttribute('id', 'show_2');
        svg_2.setAttribute('hight', '100');
        svg_2.setAttribute('width', '800');

        document.getElementById('diceHolder').appendChild(svg_2);

        //Print out the circles and text in the circles
        const centers = [30, 80, 130, 180, 230, 280, 330, 380, 430, 480, 530, 580, 630, 680, 730, 780];

        for(let i = 0; i < Math.min(exploded.length, 16); i++) {
            let c0 = createCircle(centers[i], 'purple');
            let t0 = createText(textStarts[i], exploded[i]);
            let s0 = document.getElementById('show_2');

            s0.appendChild(c0);
            s0.appendChild(t0);
        }

        console.log('exploded', exploded);
        
    }

    return
}

function loadDice(ident) {
    function diceType(){
        //Takes the values of the slection buttons in the HTML elements
        //Outputs an array of strings of what color the circles should be printed to the svg
        let skills = document.getElementById('skills').value;
        let atr = document.getElementById('attributes').value;
        let spec = document.getElementById('specialty').value;

        let arr = [];

        for(let i = 0; i < skills; i++){
            arr.push('blue');
        }
        
        for(let i = 0; i < atr; i++){
            arr.push('black');
        }

        for(let i = 0; i < spec; i++){
            arr.push('red');
        }

        for(let i = 0; i < 13 - skills - atr - spec; i++) {
            arr.push('gray');
        }

        return arr
    }
    
    const centers = [30, 80, 130, 180, 230, 280, 330, 380, 430, 480, 530, 580, 630];

    let colors = diceType();

    let svg = document.getElementById(ident);
    let circles = Array.from(svg.children);
    circles.forEach( c0 => c0.remove() );

    for(let i = 0; i < 13; i++) {
        let c0 = createCircle(centers[i], colors[i]);
        svg.appendChild(c0);
    }
    
    return

}

