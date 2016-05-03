document.addEventListener('DOMContentLoaded', function() {

    var streams = {
        "3331": "eternalenvyy",
        "3332": "arteezy",
        "3333": "universedota",
        "3334": "puppey",
        "3335": "pieliedie"
    };

    var pandaId = document.location.pathname.substring(1);

    //Return if no stream found
    if(streams[pandaId] == null){
        console.log("No twitch stream found");
        return;
    }

    var twitchId = streams[pandaId];

    //Remove static elements
    var roomSidebarContainer = document.getElementById("room_sidebar_container");
    roomSidebarContainer.parentNode.removeChild(roomSidebarContainer);

    var numberOfElementsToProcess = 8;
    var elementIsProcessedArray = [];

    while (numberOfElementsToProcess--) elementIsProcessedArray.push(false);

    var imgURL = chrome.extension.getURL("biersderp.png");
    var elemParent = document.body;

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {

                //Remove elements
                var elementsToRemove = [".room-rank-container", ".room-detail-box", ".room-head-tool", ".room-head-tool", ".room-gift-container", ".room-bamboo-container"];

                for (var i = 0; i < elementsToRemove.length; i++) {
                    var element = mutation.target.querySelector(elementsToRemove[i]);
                    if (element) {
                        element.parentNode.removeChild(element);
                        elementIsProcessedArray[i] = true;
                    }
                }

                //Change styles
                var chatBox = mutation.target.querySelector(".room-chat-box");
                if (chatBox) {
                    chatBox.innerHTML = "<iframe src='https://www.twitch.tv/" + twitchId + "/chat' width='100%' height='100%' />";
                    elementIsProcessedArray[7] = true;
                }

                var roomContentBox = mutation.target.querySelector(".room-content-box");
                if (roomContentBox) {
                    roomContentBox.style.paddingLeft = "0px";
                    elementIsProcessedArray[8] = true;
                }

                //Add Donation link
                var roomTaskContainer = mutation.target.querySelector(".room-task-container");
                if (roomTaskContainer) {
                    roomTaskContainer.innerHTML = "<p>Do you like this Chrome Extension?<a href='https://paypal.me/mkalla' target='_blank'> Buy me a beer!</a> <img src='" + imgURL + "' alt='BierDerp' width='19' height='19'/></p>";
                    roomTaskContainer.style.paddingTop = "25px";
                    elementIsProcessedArray[9] = true;
                }

                //Disconnect observer
                if (elementIsProcessedArray[0] && elementIsProcessedArray[1] && elementIsProcessedArray[2] && elementIsProcessedArray[3] && elementIsProcessedArray[4] && elementIsProcessedArray[5] && elementIsProcessedArray[6] && elementIsProcessedArray[7] && elementIsProcessedArray[8] && elementIsProcessedArray[9]) {
                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(elemParent, {
        childList: true,
        subtree: true
    });
});
