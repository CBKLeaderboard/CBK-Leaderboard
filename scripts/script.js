//Assign request variable to XMLHttpRequest object/constructor
/*const app= document.getElementById('root');
var apiLogin = ''
var apiKey = ''
var request = new XMLHttpRequest();
//var requestURL = 'https://donorbox.org/api/v1/donors';
var data
var requestURL= 'https://'+apiLogin+':'+apiKey+'@donorbox.org/api/v1/donors'

console.log(apiLogin)
console.log(apiKey)

request.open('GET', requestURL)
request.setRequestHeader('Authorization', 'Basic ' +btoa(apiLogin+':'+apiKey))
request.responseType='text'
request.send()
request.onload=function(response) {
	console.log(request.status)
	console.log(request.response)
}*/

/*fetch('https://donorbox.org/api/v1/donors', {
	method:'GET',
	mode:'no-cors',
	headers: {
		'credentials': 'same-origin',
		//'Authorization': 'Basic '+btoa(apiLogin+':'+apiKey),
		'Content-Type': 'text/plain'
	}
}).then(response => response.json());*/
var donators = []
var donatorsByAmountDonated = []
var donatorsByNumberOfDonations = []
var individual = []
for(i=0; i<data.length; i++){
	var temp = {}
	objectifyDonators(data[i].first_name, data[i].last_name, data[i].total[0].value, data[i].donations_count)
}

console.log(donators)
sortDonatorsByAmountDonated()


for(i=0; i<donators.length; i++){
	createRow(donators[i], i)
}

function createRow(donator, index){
	//make the button
	var button = document.createElement("button")
	if((index+1)%2==0){
		button.setAttribute("class", "collapsibleEven")
	}
	else{
		button.setAttribute("class", "collapsibleOdd")
	}
	//make the element to display the position
	var bPosition = document.createElement("b")
		bPosition.setAttribute("class", "position")
		bPosition.innerHTML = index+1+"."
	//make the element to display the name
	var pName = document.createElement("p")
		pName.setAttribute("class", "name")
	//create the div element that holds the collapsible
	var div = document.createElement("div")
		div.setAttribute("class", "content")
	//Column that will contain the company's image
	var tcImg = document.createElement("tc")
		tcImg.setAttribute("class", "imageColumn")
	//Table data tag that will contain image
	var tdImg = document.createElement("td")
		tdImg.setAttribute("rowspan", "2")
	//The image element that will contain the company's image
	var companyImg= document.createElement("img")
		companyImg.setAttribute("class", "company-image")
		companyImg.setAttribute("src", "images/company.pic")
		companyImg.setAttribute("alt", "image")
		tdImg.appendChild(companyImg)
		tcImg.appendChild(tdImg)
	//Creating the tr tag that holds the amount of money donated
	var tcDonateInfo = document.createElement("tc")
	var tr1 = document.createElement("tr")
	var pDonated = document.createElement("td")
		pDonated.setAttribute("class", "donated")
		pDonated.innerHTML = "$"+donator.amountDonated + " Donated"
		tr1.appendChild(pDonated)
		tcDonateInfo.appendChild(tr1)
	//Creating the tr tag that holds the number of donations made
	var tr2 = document.createElement("tr")
	var pDonations = document.createElement("td")
		pDonations.setAttribute("class", "donations")
		tr2.appendChild(pDonations)
		tcDonateInfo.appendChild(tr2)
	if(donator.numberOfDonations > 1){
		pDonations.innerHTML = donator.numberOfDonations + " Donations"
	}
	else{
		pDonations.innerHTML = donator.numberOfDonations + " Donation"
	}
	tr2.appendChild(pDonations)
	if(donator.company){
		pName.innerHTML = donator.company
	}
	else{
		pName.innerHTML = donator.name
	}
	//Add elements to button
		button.appendChild(bPosition)
		button.appendChild(pName)
	//Add elements to collapsible
		div.appendChild(tcImg)
		div.appendChild(tcDonateInfo)
		//div.appendChild(tr1)
		//div.appendChild(tr2)
	var parent = document.getElementById("leaderboard")
		parent.appendChild(button)
		parent.appendChild(div)
	//document.getElementById(button).classList.add("collapsible")

}

//Turns data from the json into data for the leaderboard
function objectifyDonators(first_name, last_name, amountDonated, numberOfDonations){
	var name
	temp.amountDonated = amountDonated
	temp.numberOfDonations = numberOfDonations
	if(last_name.indexOf(")")>-1)
	{
		name = last_name.slice(1,last_name.length-1)
		temp.company = first_name
		first_name = name.slice(0,name.indexOf(" "))
		last_name = name.slice(name.indexOf(" "), name.length)
		donators.push(temp)
	}
	else {
		temp.name = first_name+" "+last_name
		temp.first_name = first_name
		temp.last_name = last_name
		temp.company = null
		donators.push(temp)
	}
}

//Sorts donators by the total amount theyve donated
function sortDonatorsByAmountDonated(){
	var length = donators.length;
	for (var i = length-1; i>=0; i--){
	  for(var j = 1; j<=i; j++){
		if(donators[j-1].amountDonated<donators[j].amountDonated){
			var temp = donators[j-1];
			donators[j-1] =donators[j];
			donators[j] = temp;
		 }
		if(donators[j-1].amountDonated==donators[j].amountDonated){
			if(donators[j-1].numberOfDonations<donators[j].numberOfDonations){
				var temp = donators[j-1];
				donators[j-1] =donators[j];
				donators[j] = temp;
			}
		}
	  }
	}
}

//Sorts donators by the number of donations theyve made
function sortDonatorsByNumberOfDonations(){
	var length = donators.length;
	for (var i = length-1; i>=0; i--){
	  for(var j = 1; j<=i; j++){
		if(donators[j-1].numberOfDonations>donators[j].numberOfDonations){
			var temp = donators[j-1];
			donators[j-1] =donators[j];
			donators[j] = temp;
		 }
	  }
	}
}

//Rearranges elements in the array to sort them
function arrayMove(toBeSorted, index){
	var temp = toBeSorted
	donators.push(temp)
	donators.splice(index,1)
	donators.push(temp)
}
console.log(document.getElementById('leaderboard'))