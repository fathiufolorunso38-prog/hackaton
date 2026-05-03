//main Function that sign In a visitor 
function signIn(){
    //READ
    let name = document.querySelector("#visitorName").value
    let purpose = document.querySelector("#visitorPurpose").value
    let host = document.querySelector("#visitorHost").value
    let phone = document.querySelector("#visitorPhone").value

    //CHECK all field are filled 
    if (name === ""|| purpose ===""|| host ===""|| phone === "") {
        alert("Please fill in all field!")
        return
    }

    //Get the current time automatically
    let now = new Date()
    let timeIn = now.toLocaleTimeString()
    let visitorId = `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    //New row
    let row = document.createElement("tr")

    //Fill the row with visitor details
    row.innerHTML = `
    <td>${name}</td>
    <td>${purpose}</td>
    <td>${host}</td>
    <td>${phone}</td>
    <td>${timeIn}</td>
    <td id="timeout-${visitorId}">--</td>
    <td id="status-${visitorId}" class="status status-in">
        <span class="status-dot"></span>
        Signed In
    </td>
    <td>
        <button type="button" onclick="signOut('${visitorId}')">Sign Out</button>
    </td>
    `

    //Add row to table 
    document.querySelector("#logBody").appendChild(row)

    //UPDATE COUNTERS
    let visitorCount = parseInt(document.querySelector("#visitorCount").innerText) + 1
    let signedCount = parseInt(document.querySelector("#signedCount").innerText) + 1
    
    document.querySelector("#visitorCount").innerText = visitorCount
    document.querySelector("#signedCount").innerText = signedCount

    //Clear the form inputs
    document.querySelector("#visitorName").value = ""
    document.querySelector("#visitorPurpose").value = ""
    document.querySelector("#visitorHost").value = ""
    document.querySelector("#visitorPhone").value = ""
}

//Sign Out function
function signOut(visitorId){
    //Update the time out
    let now = new Date()
    let timeOut = now.toLocaleTimeString()
    document.getElementById(`timeout-${visitorId}`).innerText = timeOut
    
    //Update status
    let statusCell = document.getElementById(`status-${visitorId}`)
    statusCell.className = "status status-out"
    statusCell.innerHTML = `<span class="status-dot"></span>Signed Out`
    
    //UPDATE COUNTERS
    let signedCount = parseInt(document.querySelector("#signedCount").innerText) - 1
    let signedOutCount = parseInt(document.querySelector("#signedOutCount").innerText) + 1
    
    document.querySelector("#signedCount").innerText = signedCount
    document.querySelector("#signedOutCount").innerText = signedOutCount
}

// Search visitor by name
function searchVisitor(){
    let filter = document.querySelector("#searchInput").value.toLowerCase().trim()
    let rows = document.querySelectorAll("#logBody tr")

    rows.forEach(row => {
        let nameCell = row.cells[0]
        let nameText = nameCell ? nameCell.textContent.toLowerCase() : ""
        row.style.display = nameText.includes(filter) ? "" : "none"
    })
}

document.querySelector("#searchInput").addEventListener("input", searchVisitor)

// Load demo data for presentations
function loadDemoData(){
    const demoVisitors = [
        { name: "John Doe", purpose: "Meeting", host: "CEO", phone: "+234-801-1234567", isOut: false },
        { name: "Sarah Smith", purpose: "Interview", host: "HR", phone: "+234-802-7654321", isOut: true },
        { name: "Mike Johnson", purpose: "Delivery", host: "Front Desk", phone: "+234-803-5555555", isOut: false },
        { name: "Lisa Brown", purpose: "Meeting", host: "Finance Manager", phone: "+234-804-3333333", isOut: true },
        { name: "David Lee", purpose: "Meeting", host: "IT Department", phone: "+234-805-2222222", isOut: false }
    ]

    // Clear existing data
    document.querySelector("#logBody").innerHTML = ""
    document.querySelector("#visitorCount").innerText = 0
    document.querySelector("#signedCount").innerText = 0
    document.querySelector("#signedOutCount").innerText = 0

    // Add demo visitors
    demoVisitors.forEach(visitor => {
        let now = new Date()
        let timeIn = new Date(now.getTime() - Math.random() * 3600000).toLocaleTimeString()
        let timeOut = visitor.isOut ? new Date(now.getTime() - Math.random() * 1800000).toLocaleTimeString() : "--"
        let visitorId = `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`

        let row = document.createElement("tr")
        row.innerHTML = `
        <td>${visitor.name}</td>
        <td>${visitor.purpose}</td>
        <td>${visitor.host}</td>
        <td>${visitor.phone}</td>
        <td>${timeIn}</td>
        <td id="timeout-${visitorId}">${timeOut}</td>
        <td id="status-${visitorId}" class="status ${visitor.isOut ? 'status-out' : 'status-in'}">
            <span class="status-dot"></span>
            ${visitor.isOut ? 'Signed Out' : 'Signed In'}
        </td>
        <td>
            <button type="button" onclick="signOut('${visitorId}')">Sign Out</button>
        </td>
        `
        document.querySelector("#logBody").appendChild(row)
    })

    // Update counters
    let signedIn = demoVisitors.filter(v => !v.isOut).length
    let signedOut = demoVisitors.filter(v => v.isOut).length
    
    document.querySelector("#visitorCount").innerText = demoVisitors.length
    document.querySelector("#signedCount").innerText = signedIn
    document.querySelector("#signedOutCount").innerText = signedOut
}
