// ==UserScript==
// @name        Cibus extension
// @namespace   Violentmonkey Scripts
// @match       https://consumers.pluxee.co.il/user/friends
// @grant       none
// @version     1.0
// @author      -
// @description 20/09/2024, 15:19:45
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addDomain(domain) {
    console.log(`Adding domain ${domain}`)

    while (true) {
        var friends = document.querySelector(".cib-btn");
        friends.click();

        await sleep(1000);

        var input = document.querySelector(".mat-input-element");
        if (input == null) {
            console.log("Cannot find the input field");
            return
        }

        var confirmButton = document.querySelectorAll(".cib-btn")[2]
        if (confirmButton == null || confirmButton.textContent != " אישור ") {
            console.log("Cannot find the confirm button");
            return
        }

        input.value = domain
        input.dispatchEvent(new Event('input', { bubbles: true }));

        await sleep(1000);

        var users = document.querySelectorAll("#user-add")
        if (users.length == 0) {
            console.log("No users found");
            document.querySelector(".search-panel > a").click()
            break
        }

        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            console.log(user)
            user.dispatchEvent(new Event('click', { bubbles: true }));
        }

        confirmButton.click();
        await sleep(1000);
    }
}

async function addEveryone() {
    console.log("Adding everyone");
    await addDomain("wiz");
    await addDomain("com");
}

function main() {
    var friends = document.querySelector(".cib-btn");
    if (friends == null) {
        console.log("Cannot find the friends button");
        return
    }

    var addEveryoneButton = friends.cloneNode(true);
    addEveryoneButton.textContent = "להוספת כל החברים";
    addEveryoneButton.onclick = addEveryone
    friends.insertAdjacentElement("afterend", addEveryoneButton);
    console.log("Found the friends button");
}

setTimeout(main, 3000);