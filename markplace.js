
function rememberPlace(){

    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let selection = window.getSelection().toString();
    return {selection, scrollLeft, scrollTop}

};

function saveText(tabUrl,text){ // need to change to array 
   
    let line = text.selection;
    let scrollLeft = text.scrollLeft;
    let scrollTop = text.scrollTop;

     let dataObj = {
        line: line.trim(),
        url: tabUrl,
        scrollLeft: scrollLeft, //x
        scrollTop: scrollTop //y 
    };
    console.log(dataObj);
    chrome.storage.local.get('content', data =>{
        console.log(data);
        //initialize first?
        if(Object.keys(data).length === 0 && data.constructor === Object){
            initialize(data.content)
        }else{
            update(data.content);
        }
    });

    const initialize =(data)=>{
        data = [dataObj] //{[tabUrl]: text});
        chrome.storage.local.set({'content': data}, (res)=>{
        console.log('initialed' + res)
        })
    };

    const update = (data)=>{ // not pushing new obj properly
        data.push(dataObj) //{[tabUrl]: text});
        chrome.storage.local.set({'content': data}, ()=>{
            console.log('saved content')
        });
    }
}
 

const getItemsFromLocalStorage = async ()=>{
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get('content',(res)=>{ //'url':'','content':''
            // url = res.url
            console.log('get '  + res.content) //+ res.url + 
            resolve(res.content) //{url:res.url, placeContent:res.content}
        });
    });
};

const removeItem = async (line)=>{ //there is issue
    await chrome.storage.local.get('content', function(res) {
        let newRes = res.content.filter(elem => elem.line !== line);
        console.log(newRes);
        chrome.storage.local.set({'content': newRes}, function(res) {
            console.log(res);
        });
    });
};

const scrollToElem = async (line,x,y)=>{
    let queryOptions = { active: true, currentWindow: true };
    await chrome.tabs.query(queryOptions,(tabs)=>{
        const tabId = tabs[0].id;
        console.log(tabId, x,y);
        chrome.tabs.sendMessage(tabId,{ type: "FROM_MY_EXTENSIONS", value:{line, x, y}}, res=>{
            console.log(res);
        });
        chrome.scripting.executeScript({
            target:{tabId},
            files: ['content.js'],
        })
    });   
}

const populateOptions = (content) =>{
    const bookmarks = document.querySelector("#bookmarks-list");

    content.map(elem => {
        console.log(elem);
        let li = document.createElement('li')
        li.innerHTML = `<a href=${elem.url} target="_blank">${elem.line.slice(0,50)}</a>
            <span></span>
        `;
        const goToBtn = document.createElement('button');
        goToBtn.className = 'scroll';
        goToBtn.innerHTML = 'scroll to';
        goToBtn.addEventListener('click', ()=> scrollToElem(elem.line, elem.scrollLeft, elem.scrollTop));
        li.append(goToBtn);
        const btn = document.createElement('button');
        btn.className = 'remove';
        btn.innerHTML = 'remove';
        btn.addEventListener('click', ()=> removeItem(elem.line))
        li.append(btn);
       
        bookmarks.append(li);
    }); 
}


async function main(){
    const content = await getItemsFromLocalStorage();
    console.log(content);
    if(content.length > 0){
        populateOptions(content);
    }else{
        return;
    }
};

async function getFromCLick(){
    let tabOptions = {active: true, currentWindow: true};

    await chrome.tabs.query(tabOptions, (tabs)=>{
        const tabId = tabs[0].id;
        const {url} = tabs[0];
        chrome.scripting.executeScript({
            target:{tabId},
            func: rememberPlace
            },(res)=>{
            console.log(res[0].result);
            saveText(url, res[0].result);
        });
    });
    const content = await getItemsFromLocalStorage();
    if(content!== undefined){
        console.log(content)
        populateOptions(content);
    }
};


const add = document.getElementById('add');
add.addEventListener('click', () => getFromCLick());


main();
