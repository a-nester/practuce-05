// setTimeout(() => console.log(1), 0);
// console.log(2);
// new Promise((res) => {
//   console.log(3);
//   res();
// }).then(() => console.log(4));
// console.log(5);


// - Використовуй prompt та повертай значення звідти.
// - Створи функцію, яка буде набувати значення з prompt і повертатиме проміс.
// Додай перевірку:
// Якщо значення не є числом, відхиляй проміс та логіруй "error".
// Якщо значення парне, вирішуй проміс та повертай "even" через 1 секунду.
// Якщо значення не парне, вирішуй проміс та повертай "odd" через 2 секунди.

const answer = prompt("Enter value");

function check(answer) {
    return new Promise((resolve, reject) => {
        const answerToNumber = Number(answer);
        if (Number.isNaN(answerToNumber)) {
            reject("Error");
        } else if(answerToNumber % 2 === 0) {
            setTimeout(() => resolve("Even"), 1000);
        } else if (answerToNumber % 2 !== 0) {
            setTimeout(() => resolve("Odd"), 2000);
        }
    })
}

check(answer)
    .then(value => console.log(value))
    .catch(err => console.log(err));