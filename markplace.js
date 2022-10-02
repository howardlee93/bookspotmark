

//https://github.com/YonatanKra/social-styled-text/blob/master/ui/popup.js
async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab.url;
};


function rememberPlace(){
    // console.log(window.getSelection())
    return window.getSelection().toString();
    // const line = event.target.textContent;
    // const srollPlace = event.target.scrollTop; //window.scrollY? // offsetTop
    //     //get dom path
    //     // https://stackoverflow.com/questions/5728558/get-the-dom-path-of-the-clicked-a
    // return {line, srollPlace};
        
        //copy path??
};

// const update = (data)=>{
//     data.push();
// }
function saveText(text){ // need to change to array 
    // let textList =[];
    // textList.push(text);

    chrome.storage.local.get('content', data=>{
        console.log(data);
        update(data.content);
    })
    const update =(data)=>{
        data.push(text);
        chrome.storage.local.set({'content': data}, ()=>{
        console.log('saved content')
        });
    }
}


const persistToLocalStorage = (url)=>{ //need to change to array 
    chrome.storage.local.get('url', data=>{
        console.log(data);
        update(data.url);
    });

    const update =(data)=>{
        data.push(url);
        chrome.storage.local.set({'url':data}, ()=>{
            console.log('saved url');
        });
    };
};

const getItemsFromLocalStorage = async ()=>{
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get({'url':'','content':''},(res)=>{
            // url = res.url
            console.log('get ' + res.url + res.content)
            resolve({url:res.url, placeContent:res.content})
        });
    });
}

const populateOptions = (url, placeContent) =>{
    const bookmarks = document.querySelector("#bookmarks-list");
    let urlObj = url.map((url,i) =>({
        url:url,
        text: placeContent[i]
    }))

    urlObj.map(elem=>{
        let li = document.createElement('li')
        li.innerHTML = `<a href=${elem.url} target="_blank">${elem.text}</a>
            <span></span>
        `;
        const btn = document.createElement('button');
        btn.className = 'remove';
        btn.innerHTML = 'remove';
        li.append(btn);
        bookmarks.append(li);
    }); 
}


async function main(){
    const {url, placeContent} = await getItemsFromLocalStorage();
    console.log(url, placeContent);
    if(url !== undefined && placeContent!== undefined){
        console.log(url, placeContent)
        populateOptions(url, placeContent);
    }
};

async function getFromCLick(){
    let tabOptions = {active: true, currentWindow:true};

    await chrome.tabs.query(tabOptions, (tabs)=>{
        const tabId = tabs[0].id;
        const {url} = tabs[0];
        persistToLocalStorage(url);
        chrome.scripting.executeScript({
            target:{tabId},
            func: rememberPlace
            },(res)=>{
            console.log(res[0].result);
            saveText(res[0].result);
        });
    });
    const {url, placeContent} = await getItemsFromLocalStorage();
    if(url !== undefined && placeContent!== undefined){
        console.log(url, placeContent)
        populateOptions(url, placeContent);
    }
   
};

// async function init(){

//     const bookmarks = document.querySelector("#bookmarks-list");

//     let test = document.createElement('li');
//     let url = await getCurrentTabUrl();
//     test.innerHTML = `<a href=${url} target="_blank">link1</a><button class="remove">remove</button>; //'hello';
//     bookmarks.append(test);
// }

// init();


const add = document.getElementById('add');
add.addEventListener('click', () => getFromCLick());


//remove nees some work
const remove = document.getElementsByClassName('remove');
Array.from(remove).forEach(remove => remove.addEventListener('click', ()=>{
    let elemToBeRemoved = this.parentElement;
    console.log(elemToBeRemoved);
}));


main();
