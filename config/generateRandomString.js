const { v4: uuid_v4 } = require('uuid');


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateString =(length)=> {
    // let result = '';
    // const charactersLength = characters.length;
    // for ( let i = 0; i < length; i++ ) {
    //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    let result = uuid_v4();

    return result.trim();
}

module.exports = generateString;