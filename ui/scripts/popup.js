function getValues() {
    let qs = document.getElementById("selector").value;
    let color = document.getElementById("color").value;
    var table = document.getElementById("prefTable");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            let tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: highlightStuff,
                args: [qs, color, table],
            });
        }
    });
}
function addTableRow(qs, color, table) {
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}
function highlightStuff(qs, color, table) {
    // addTableRow(qs, color, table);
    document
        .querySelectorAll(qs)
        .forEach((x) => (x.offsetParent.style.backgroundColor = color));

    document.querySelectorAll("iframe").forEach((iframe) => {
        iframe.contentDocument
            .querySelectorAll(qs)
            .forEach((x) => (x.offsetParent.style.backgroundColor = color));
    });
}

function udpatePackDetails(themeName){
  let packDetails = document.getElementById('details-table');

  packDetails.innerHTML = "";

  let packName = document.getElementById('pack-name');

  let qsList = themePacks[themeName].querySelectors;

  packName.innerText = themeName;

  qsList.forEach(qs => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${qs.name}</td><td><span style="color:${qs.color};font-size:20px">■</span> ${qs.color}</td><td></td>`;

    packDetails.appendChild(tr);
  });
}

(function () {
    document.getElementById("highlight").addEventListener("click", getValues);

    let themeContainer = document.getElementById("theme-container");

    Object.values(themePacks).forEach((pack) => {
        let themeItem = document.createElement("div");
        themeItem.className = "theme";
        themeItem.style.borderColor = pack.color;
        themeItem.style.color = pack.color;
        themeItem.innerText = pack.name;

        themeItem.addEventListener('click', () => udpatePackDetails(pack.name));
        themeContainer.appendChild(themeItem);
    });
})();
