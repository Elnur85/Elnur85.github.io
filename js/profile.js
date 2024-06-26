async function createUserScreen() {
    document.getElementById("userDataMain").innerHTML = "";
    var response = await getData(userQuery);
    const userData = response.data.user[0]
    addElement("div", { "id": "userData", "class": "container" }, "", "userDataMain")
    addElement("div", { "id": "userHeader", "class": "header bottom-shadow font20" }, "GraphQL Project profile", "userData")
    addElement("div", { "class": "header bottom-shadow font18" }, userData.attrs.firstName + " " + userData.attrs.lastName + " (" + userData.login + ")", "userData")
    const items = ["personalIdentificationCode", "nationality", "educationLevelCompleted", "tel", "email", "gender", "addressCountry", "addressCity", "addressStreet"]
    items.forEach(x => {
        if (typeof userData.attrs[x] != "undefined") {
            addElementPair(correctValue(x), userData.attrs[x], "userData")
        }
    })
    addElement("div", { "id": "schoolData", "class": "container" }, "", "userDataMain")
    addElement("div", { "id": "userHeader", "class": "header bottom-shadow font20" }, "School statistics", "schoolData")
    var response = await getData(totalExpQuery);
    const exp = response.data.transaction
    const totalXP = exp.reduce(function (acc, obj) { return acc + obj.amount; }, 0);
    addElementPair("Finished tasks", exp.length, "schoolData")
    addElementPair("Total XP points earned", ByteConverter(totalXP), "schoolData")
    addElementPair("Audit ratio", Math.round(userData.auditRatio * 100) / 100, "schoolData")
    addElementPair("Audits done", ByteConverter(userData.totalUp), "schoolData")
    addElementPair("Audits recieved", ByteConverter(userData.totalDown), "schoolData")
}
function ByteConverter(val) {
    return val > 1000 * 1000 ? (Math.round(val / (1000 * 1000) * 100) / 100) + "MB" : val > 100 ? (Math.round(val / (1000) * 10) / 10) + "kB" : val + "B";
}
function addElementPair(key, value, id) {
    addElement("div", { "class": "thead" }, key + ":", id)
    addElement("div", { "class": "tcontent" }, value, id)
}
function correctValue(value) {
    value = value.replace(/([A-Z])/g, ' $1').trim()
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}