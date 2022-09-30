
async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab.url;
};


function rememberPlace(){

    const selection = (event) =>{
        const line = event.target.textContent;
        const srollPlace = event.target.scrollTop; //window.scrollY? // offsetTop

        //get dom path
        // https://stackoverflow.com/questions/5728558/get-the-dom-path-of-the-clicked-a
        return {line, srollPlace};
        
        //copy path??
    };

}

const persistToLocalStorage = (url, place,)=>{
    let flag;
    if(!flag){
        localStorage.setItem({
            url: url,
            place: place
        });

        flag = true
    };
    return flag;
};

async function main(){
    if (inLocalStorage){
        //takes you to work 

        //scrolls to that page  scrollsTo

        //scrollIntoView
    }else{
        let url = await getCurrentTabUrl();
        let place = rememberPlace();
        persistToLocalStorage(url,place);
        console.log('saved');
    };

}


async function init(){
    const bookmarks = document.querySelector("#bookmarks-list");

    let test = document.createElement('li');
    let url = await getCurrentTabUrl();
    test.innerHTML = `<a href=${url} target="_blank">link1</a>`; //'hello';
    bookmarks.append(test);
}

init();
