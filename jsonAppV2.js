/*Application to read and display contents from a JSON file birds */

//Load libraries
const fs = require('fs');
const _ = require('lodash');
const rlSync = require('readline-sync');

//Read JSON file
const myJSONFIle = fs.readFileSync('birds.JSON');
const booksBestSellers = fs.readFileSync('bestseller.json');

//Parse JSON file
let myConvertFile = JSON.parse(myJSONFIle);
let myBookSellerConvert = JSON.parse(booksBestSellers);

//Access the birds array in the object
let birds = myConvertFile.birds;

//Import export data
let religionImport = require('./religionData');


//Function - Family Bird Search
familyBirdSrch = () => {
    //Take input from the terminal
    let familySrch = rlSync.question('Enter the bird family name: ');
    //Ensure the case entuered is starts with an upper case
    familySrch = _.startCase(familySrch);


    //Loop through the array to retreive both family and its members
    for (let i = 0; i <  birds.length; i ++) {
        let subSrch = _.startsWith(birds[i].family, familySrch);

        //Parse terminal input into condition
        if (subSrch) {
            console.log(birds[i].family);
            console.log(birds[i].members);

    
        };
    
    };

};

//All birds in the JSON file
allBirds = () => {

    //Loop through the array to get all the family and birds

    for (let i = 0; i < birds.length; i ++) {
        console.log(birds[i].family);
        console.log(birds[i].members);
    };

};

//Main religions of the world
allReligion = () => {
    //Variables to hold religions - Christianity (Western / Eastern and Others)
    let westChristianlty = religionImport.abrahamic.Christianity["Western Christianity"];
    let eastChristianlty = religionImport.abrahamic.Christianity["Eastern Christianity"];
    let otherChristianlty = religionImport.abrahamic.Christianity.Other;
    let worldIslam = religionImport.abrahamic.Islam;


    //Take input from the console
    let religionSel = rlSync.question('Enter 1 - West, 2 - East, 3 - Other Christianity, 4 Islam : ');

        if (religionSel < 1 || religionSel > 4) {
            console.log(' re-run application and enter number between 1 and 4');
            } else {
    
            //Selector to choose Western, Eastern or Other Christinality
            switch (religionSel) {
                case '1':
                console.log(westChristianlty);
                break;

                case '2':
                console.log(eastChristianlty);
                break;

                case '3':
                console.log(otherChristianlty);
                break;

                case '4':
                console.log(worldIslam);
                break;

                default:
                console.log(westChristianlty);
                break;

            };
        };

 
};

//Books best sellers
BestSellers = () => {

    //Take author name from the terminal

    let optionSel = rlSync.question('Enter 1 - All Books, 2 to search for title, 3 - search for author: ');
    //Conditional statement for the optiojs

    if (optionSel == 1) {
        console.log(myBookSellerConvert);

        } else if (optionSel == 2) {

            let bookTitleQuestion = rlSync.question('Enter book title: ');
            console.log('');
            console.log('');

            //Change console entry character to upper case
            bookTitleQuestion  = _.startCase(bookTitleQuestion);

            //Variable for book  titles
            let bookTitle = myBookSellerConvert.books;

            //Loop to check for authors in the JSON file
            for (let i = 0; i < bookTitle.length; i ++) {

            let titleSrch = _.includes(bookTitle[i].title, bookTitleQuestion)
        
            if (titleSrch) {
            
            console.log(`${bookTitle[i].title} : Author ${bookTitle[i].author}` );
        }
    };
        } else if (optionSel == 3) {
            //Take in book author from the terminal
            let bookAuthorQuestion = rlSync.question('Enter book author: ');
            console.log('');
            console.log('');

            //Change console entry chaaracter to upper case
         bookAuthorQuestion = _.startCase(bookAuthorQuestion);

            //Assign variable to the JSON file
            let bookAuthor = myBookSellerConvert.books;

            //Loop through the book array 
            for (let i = 0; i < bookAuthor.length; i ++) {
                let authorSrch = _.includes(bookAuthor[i].author, bookAuthorQuestion);
                    if (authorSrch) {
                        console.log(`${bookAuthor[i].author} :Title ${bookAuthor[i].title}`);
                    };
            }
        } else {
        console.log('you have not chosen any of the options. Application will now exit');
        process.exit(0);
    };
    
    

    

};


mainMenu = () => {

    console.log('-------MENU---------');
    console.log('|                   |');
    console.log('|  1. All Birds     |');
    console.log('|  2. Bird Search   |');
    console.log('|  3. World Religion|');
    console.log('|  4. Best Sellers  |');
    console.log('|  5. Exit          |');
    console.log('---------------------');

    let optionSel = rlSync.question('Make a selction: ');

        if( optionSel < 0 || optionSel > 5 ) {
            console.log(`${optionSel} is an invalid selection!! Run application again`);
            process.exit(0);
            } else {
            switch (optionSel) {
            case '1':
            allBirds();
            break;

            case '2':
            familyBirdSrch();
            break;

            case '3':
            allReligion();
            break;

            case '4':
            BestSellers();
            break;

            case '5':
            process.exit(0);

            default:
            allBirds();
            break;
        };
    };

};

//Main Applicaiton Starts here
mainMenu();
