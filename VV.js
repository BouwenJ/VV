// JavaScript source code
var interval;
var bids;
var currentBid;
var maxPrice = 4;
var increment = 1;
var timeRemaining;
var countDown;
var countDownStarted = false;
var timeLeft;
var products = ["130575", "130557"];
var text;
var me = "Jens Bouwen";
var highestBidder;

function startAuction() {
    var currenProduct = document.getElementById("biddingBlock");

    if (currenProduct != null) {
        currenProduct = currenProduct.getAttribute("data-product-id");
    }

    if (products.includes(currenProduct)) {
        currentBid = 0;

        //Show Running     
        var node = document.createElement("div");
        text = document.createTextNode("Running Auction Checker");
        node.id = "AuctionChecker";
        node.appendChild(text);
        document.getElementById("placeBidRow").appendChild(node);
        console.log("Auction Started");

        interval = setInterval(checkNewBids, 1000);
    } else if (currenProduct != null) {
        alert("Product not on list." + currenProduct);
    }
}

function getLength() {
    var currentLength = document.getElementById("jsBidHistoryList").getElementsByTagName("li").length;
    console.log(currentLength);
}

function stopAuction() {
    clearInterval(interval);
    console.log("Auction Ended");
    location.reload();
}

function checkNewBids() {
    //console.log("Checking...");

    // Check Highest Bid
    var highestBid = document.getElementById("jsMainLotCurrentBid").innerHTML;
    highestBidder = document.getElementById("highestBidder").innerHTML;
    if (highestBid > currentBid) {
        console.log("New Highest Bid: " + highestBid + " - " + highestBidder);
        currentBid = highestBid;
    }

    if (highestBidder == me) {
        console.log("WINNING!!!");
    } else {
        if (highestBid < maxPrice) {
            var newBid = parseInt(highestBid) + increment;

            bid(newBid);
        }
    }

    if (typeof (document.getElementsByClassName("auctionResultsBlock lostAuction panel round")[0]) != 'undefined') {
        stopAuction();
        return;
    }

    countDown = document.getElementsByClassName("timer-countdown-label")[0];

    if (!countDownStarted && countDown != null) {
        initCountdown();
    }

    if (countDownStarted) {
        timeLeft = countDown.innerHTML;
        document.getElementById("AuctionChecker").style.color = "red";
        if (timeLeft == 1) {
            console.log(timeLeft);
            //bid(maxPrice);
        }
    }
}

function initCountdown() {
    console.log("Countdown Started");
    countDownStarted = true;
}

function bid(price) {
    console.log("Bidding:" + price);
    if (currentBid < price) {
        document.getElementById("jsActiveBidInput").value = price;
        var placeBidButton = document.getElementById("jsActiveBidButton");
        placeBidButton.click();
    }
}

//document.onload = startAuction();
document.onload = showProduct();

function showProduct() {
    alert("Show all Products");
}