
const disasterReliefRequests = [
    { name: "Cecilia Leung", phone: "123-555-1234", location: "Community Center", canDropOff: "Yes" },
    { name: "Celine Nguyen", phone: "123-555-5678", location: "Park", canDropOff: "No" },
    { name: "Aranyah Shanker", phone: "123-555-9876", location: "Town Hall", canDropOff: "Yes" },
  ];
  
  
  function createReliefCard(request) {
    
  
    const cardElement = document.createElement("article"); 
    cardElement.classList.add("relief__request-card"); 
  
    const nameTag = document.createElement("p");
    nameTag.classList.add("relief__name");
    nameTag.innerText = `Name: ${request.name}`;
  
    const phoneTag = document.createElement("p");
    phoneTag.classList.add("relief__phone");
    phoneTag.innerText = `Phone: ${request.phone}`;
  
    const locationTag = document.createElement("p");
    locationTag.classList.add("relief__location");
    locationTag.innerText = `Drop-off Location: ${request.location}`;
  
  
    const canDropOffTag = document.createElement("p");
    canDropOffTag.classList.add("relief__can-drop-off");
    canDropOffTag.innerText = `Can drop off resources: ${request.canDropOff}`;
  
  
    cardElement.appendChild(nameTag);
    cardElement.appendChild(phoneTag);
    cardElement.appendChild(locationTag);
    cardElement.appendChild(canDropOffTag);
  
    console.log(cardElement); 
    return cardElement; 
  }
  
  
  const renderReliefRequests = () => {
    
    const myReliefRequestsEl = document.querySelector(".relief__requests-list");
  
   
    myReliefRequestsEl.innerHTML = "";
  
    for (let i = 0; i < disasterReliefRequests.length; i++) {
      const card = createReliefCard(disasterReliefRequests[i]);
  
      myReliefRequestsEl.appendChild(card);
    }
  };
  
  renderReliefRequests();
  
  
  
  const formEl = document.querySelector(".relief-form");
  
  
  formEl.addEventListener("submit", submitHandler);
  
  
  function submitHandler(event) {
    event.preventDefault(); 
  
  
    let requestData = {
      name: event.target.name.value,
      phone: event.target.phone.value,
      location: event.target.location.value,
      canDropOff: event.target.canDropOff.checked ? "Yes" : "No",
    };
  
    disasterReliefRequests.push(requestData); 
  
    console.log(disasterReliefRequests);
  
    renderReliefRequests();

    event.target.reset();
  }