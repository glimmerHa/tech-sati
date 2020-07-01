function C() {
    async function async1() {
        console.log('1');
        Promise.resolve(async2()).then(() => {
            console.log('2'); //3
        })
    }

    async function async2() {
        console.log('3');
        Promise.resolve(async3()).then(() => {
            console.log(4) //2
        })
    }

    async function async3() {
        console.log('5');
        Promise.resolve(async4()).then(() => {
            // 5
            console.log(6);
        })
    }

    async function async4() {
        await console.log('7');
        console.log(8)
    }

    console.log('9');
    setTimeout(function () {
        console.log('a');
    }, 0)
    async1();
    new Promise(function (resolve) {
        console.log('b');
        resolve();
    }).then(function () {
        console.log('c'); // 4
    });
    console.log('d');
}
C()