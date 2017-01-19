const Box = x => 
    ({
        map: f => Box(f(x)),
        fold: f => f(x)
    })

const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())

const result = nextCharForNumberString('   64');

console.log(result);

const moneyToFloat = str =>
    Box(str.replace(/\$/g, ''))
    .map(r => parseFloat(r))

const percentToFloat = str =>
    Box(str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01)

const applyDiscount = (price, discount) => 
    moneyToFloat(price)
    .fold(cost => 
        percentToFloat(discount)
        .fold(savings => cost - cost * savings))

const result2 = applyDiscount('$5.00', '20%');

console.log(result2);