function getValues() {
    let qs = document.getElementById("selector").value;
    let color = document.getElementById("color").value;


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            let tabId = tabs[0].id;
            

            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: highlightStuff,
                args: [qs, color]
            });
        }
    });
}

function highlightStuff(qs, color){
    document.querySelectorAll(qs).forEach(x => x.offsetParent.style.backgroundColor=color);

    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.contentDocument.querySelectorAll(qs).forEach(x => x.offsetParent.style.backgroundColor=color);
    });
}

document.getElementById("highlight").addEventListener("click", getValues);
