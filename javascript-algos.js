
function clearNames() {
    let rootDiv = document.getElementById('listContainer');
    if (rootDiv) {
        while (rootDiv.hasChildNodes()) {
            rootDiv.removeChild(rootDiv.lastChild);
        }
    }
}

function initDocument() {
    clearNames();
    initUsersNames();
    initMessages();
    initConstantTimeNameFileter()
}

function initUsersNames() {
    let rootDiv = document.createElement('div');
    rootDiv.id = 'listContainer';
    let userNamesContainer = document.createElement('div');
    userNames.forEach(function (userName, index) {
        let childDiv = document.createElement('div');
        let text = document.createTextNode(index.toString().concat(' .) ').concat(`${userName.firstName} ${userName.lastName}`));
        childDiv.appendChild(text);
        userNamesContainer.appendChild(childDiv);
    });
    rootDiv.appendChild(userNamesContainer);
    document.body.appendChild(rootDiv);
}

function initMessages() {
    let rootDiv = document.createElement('div');
    let messagesContainer = document.createElement('div');
    messagesContainer.id = 'messagesContainer';
    messagesContainer.style['float'] = 'left';
    document.body.appendChild(messagesContainer);
}

function clearMessages() {
    /*TODO CLEAR MESSAGES FROM DOCUMENT WHEN USER CLICKS THE [CLEAR MESSAGES] BUTTON */
    let message = document.getElementById("messagesContainer")
    let children = message.childNodes

    for (let i = 0; i < children.length; i++) {
        message.removeChild(children[i])
    }

    /* EXTRA CREDIT INCLUDE A SCRIPT TAG THATS FETCHES BOOTSTRAP CSS STLYINGS AND STYLE THE BUTTONS */
}

function addPlainMessage() {
    const userText = getUserText();
    let messagesContainer = document.getElementById('messagesContainer');
    let messageDiv = document.createElement('p');
    const text = document.createTextNode(userText);
    messageDiv.appendChild(text);
    messagesContainer.appendChild(messageDiv);
    clearUserInput();
}

function addHandleMessage(handle) {
    let messagesContainer = document.getElementById('messagesContainer');
    let messageDiv = document.createElement('p');
    let handleSpan = document.createElement('span');
    handleSpan.style['color'] = 'dodgerblue';
    handleText = document.createTextNode(handle);
    handleSpan.appendChild(handleText);
    // TODO:: EXCLUDING THE ORIGINALLY TYPED USER NAME REPLACE THIS TEXT \
    //        WITH ANY ADDITIONAL USER TEXT FROM THE ORIGIN USER TEXT MESSAGE
    let dummyText = 'TODO:: EXCLUDING THE ORIGINALLY TYPED USER NAME REPLACE THIS TEXT \
                 WITH ANY ADDITIONAL USER TEXT FROM THE ORIGIN USER TEXT MESSAGE';
    let messageText = document.createTextNode(getUserText().replace(/^@[^\s]*\s/, ' '));
    messageDiv.appendChild(handleSpan);
    messageDiv.appendChild(messageText);
    messagesContainer.appendChild(messageDiv);

    clearFilteredNames();
    clearUserInput();
}

//TODO SET THE FLAG TO FALS ONCE YOU UNDERSTAND THE ASSIGNMENT
const instructionsFlag = false;
if (instructionsFlag) {
    console.log(`README`);
    console.log(`
    SETUP ->
    1. INSTALL LODASH USING NPM AND SAVE THE DEPENDENCY TO YOUR PACKAGE.JSON FILE

    2. IMPORT LODASH INTO THE INDEX.JS FILE.

    3. COMPLETE ALL TODOS
`);
}


/* TODO ADD ADDITONALY 
   OBJECTS LIKE THE ONES BELOW, MINIMUM OF TEN.  
   EACH MUST CONTAIN A FIRST AND LAST NAME AND HANDLE */


const userNames = [
    {
        firstName: 'Chandler',
        lastName: 'Gegg',
        handle: '@CGegg'
    },
    {
        firstName: 'Phil',
        lastName: 'Mickelson',
        handle: '@PMickelson'
    },
    {
        firstName: 'Grace',
        lastName: 'Hopper',
        handle: '@GHopper'
    },
    {
        firstName: 'Horace',
        lastName: 'Grant',
        handle: '@HGrant'
    },
    {
        firstName: 'Xiaoxi',
        lastName: 'Zhang',
        handle: '@XZhang'
    },
    {
        firstName: 'Jie',
        lastName: 'Bao',
        handle: '@JBao'
    },
    {
        firstName: 'Junhua',
        lastName: 'Shi',
        handle: '@JShi'
    },
    {
        firstName: 'Dongdong',
        lastName: 'Lee',
        handle: '@DLee'
    },
    {
        firstName: 'Eric',
        lastName: 'Lv',
        handle: '@ELv'
    },
    {
        firstName: 'Jessica',
        lastName: 'Bush',
        handle: '@JBush'
    }
];

const userMessages = [];

const debounce = (func, delay) => {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

function initConstantTimeNameFileter() {
    /* EXTRA CREDIT */
    let nameMap = {}
    for (let j = 0; j < userNames.length; j++) {
        let firstName = userNames[j].firstName
        let lastName = userNames[j].lastName

        for (let i = 0; i < firstName.length - 2; i++) {
            let key = firstName.slice(i, i + 3).toLowerCase()           
            if(nameMap[key]){
                nameMap[key].add(userNames[j])
            } 
            else {
                nameMap[key] = new Set([userNames[j]])
            }        
        }

        for (let i = 0; i < lastName.length - 2; i++) {
            let key = lastName.slice(i, i + 3).toLowerCase()        
            if(nameMap[key]){
                nameMap[key].add(userNames[j])
            } 
            else {
                nameMap[key] = new Set([userNames[j]])
            }        
        }
    }

    return nameMap

}
function constantTimeNameFilter(userText) {
    /* EXTRA CREDIT :: CONVERT filterNames FUNCTION TO DO CONSTANT TIME LOOK UP.  
    THIS WILL REQUIRE initConstantTimeNameFileter ON PAGE LOAD AS WELL */
    const firstThreeChars = userText.toLowerCase().slice(1, 4);
    let re = new RegExp(firstThreeChars, 'g');
    console.log(`First three characters: ${firstThreeChars} `);

    const filteredNames = [];
    userNames.forEach((userName) => {
        const fullname = `${userName.firstName.toLowerCase()} ${userName.lastName.toLowerCase()}`;
        let isMatch = !!userName.firstName.toLowerCase().match(re) || !!userName.lastName.toLowerCase().match(re);
        console.log(`Fullname: ${fullname}`);
        console.log(isMatch);
        console.log(`Fullname: ${fullname}`);
        if (isMatch) {
            filteredNames.push(userName);
        }
    });

    let keyMap = initConstantTimeNameFileter()
    if(firstThreeChars in keyMap){
        console.log(keyMap[firstThreeChars])
        return keyMap[firstThreeChars]
    }
    else {
        return []
    }
}

function filterNames(userText) {
    const firstThreeChars = userText.toLowerCase().slice(1, 4);
    let re = new RegExp(firstThreeChars, 'g');
    console.log(`First three characters: ${firstThreeChars} `);
    console.log(`First three characters: ${firstThreeChars} `);
    const filteredNames = [];
    userNames.forEach((userName) => {
        const fullname = `${userName.firstName.toLowerCase()} ${userName.lastName.toLowerCase()}`;
        let isMatch = !!userName.firstName.toLowerCase().match(re) || !!userName.lastName.toLowerCase().match(re);
        console.log(`Fullname: ${fullname}`);
        console.log(isMatch);
        console.log(`Fullname: ${fullname}`);
        if (isMatch) {
            filteredNames.push(userName);
        }
    });
    return filteredNames;
}

function initFilteredNames(filteredNames) {
    clearNames();
    let rootDiv = document.createElement('div');
    rootDiv.id = 'filteredNamesContainer';
    let namesContainer = document.createElement('div');
    filteredNames.forEach((name) => {
        let nameElm = document.createElement('button');
        nameElm.style['background-color'] = 'dodgerblue';
        nameElm.style['cursor'] = 'pointer';
        nameElm.setAttribute('class', 'filtered-name');
        let text = document.createTextNode(`${name.firstName} ${name.lastName}`);
        nameElm.appendChild(text);
        namesContainer.appendChild(nameElm);

        /* 
            TODO :: ADD CLICK EVENT LISTENER [addEventListener] TO EACH NAME ELEMENT.
            IF THE USER CLICKS ON A FILTERED NAME THEN THEN A MESSAGE IS OUTPUT
            USING THE ADD MESSAGE FUNCTION THAT REPLACES THE USER name WITH THE USER HANDLE.
            THE addHandleMessage FUNCTION SHOULD BE INVOKED FROM INSIDE THE CALLBACK OF THE EVENT LISTENER.

            TIPS:
                BRUTE FORCE :: ASIGN A UNIQUE ID TO EACH NAME ELEMENT, GRAB ID FROM THE EVENT AND
                               PASS IT AS AN ARGUMENT TO ADD MESSAGE FUNCTION THEN SEARCH USER NAMES ARRAY
                
                DATA ATTRIBUTE :: ASSIGN A DATA ATTRIBUTE CALLED [handle] TO EACH THE NAME ELEMENT
                                  GRAB DATA ATTRIBUTE FROM THE EVENT AND PASS IT AS AN ARGUMENT TO 
                                  ADD MESSAGE FUNCTION THEN SEARCH USER NAMES ARRAY

            EXAMPLE: @chandler => @CGegg
        */

        //TODO WRAP THIS FUNCTION WITH EVENT LISTENER AND UNCOMMENT IT
        //TODO REPLACE [myHandle] WITH THE USERS CORRECT HANDLE
        // addHandleMessage('myHandle'); 


        nameElm.addEventListener(
            'click',
            () => {
                addHandleMessage(name.handle)
            }
        );

    });
    document.body.appendChild(namesContainer);

}

function clearUserInput() {
    document.getElementById('inputText').value = '';
}

function clearFilteredNames() {
    const filteredNames = document.getElementsByClassName('filtered-name');
    Array.from(filteredNames).forEach((filteredName) => {
        filteredName.remove();
    });

}

function getUserText() {
    return document.getElementById('inputText').value.trim();
}

function searchNames() {
    const userText = getUserText();
    console.log('Search names ...');
    console.log(userText);
    console.log('Search names ...');

    const firstChar = userText[0] || '';
    if (firstChar === '@') {
        console.log('filter names ...');
      //  const filteredNames = filterNames(userText);
        const filteredNames = constantTimeNameFilter(userText);
        initFilteredNames(filteredNames);
    } else {
        console.log('MISSING @ IN USER TEXT');
    }
}
// TODO UPDATE THE DEBOUNCE DELAY TO MORE CLOSELY RESEMBLE USER TYPING
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('inputText').addEventListener(
        'input',
        debounce(
            searchNames,
            8000
        )
    );
    initDocument();
});
