const Box = x => 
    ({
        map: f => Box(f(x)),
        fold: f => f(x)
    })

const Right = x =>
({
    map: f => Right(f(x)),
    fold: (f, g) => g(x)
})

const Left = x =>
({
    map: f => Left(x),
    fold: (f, g) => f(x)
})

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

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

const findColor = name => fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]);

const res = findColor('bluegreen')
            .map(c => c.slice(1))
            .map(c => c.toUpperCase())
            .fold(e => 'no color', x => x)

console.log(res);