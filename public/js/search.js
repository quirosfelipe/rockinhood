window.addEventListener("DOMContentLoaded", event => {
    const searchBar = document.querySelector(".searchbar-input-field");

    // const companyList = async () => {
    //     const res = await fetch(`/stocks/allcompanies/`);
    //     const companyData = await res.json();
    //     console.log(companyData);
    // }
    const companyNames = ["amazon", "anheuser busch inbev", "apple", "berkshire hathaway", "boeing",
        "british petroleum", "costco", "disney", "exxon mobil", "facebook", "ford", "general electric",
        "home depot", "ibm", "intel", "jpmorgan", "johnson & johnson", "kraft foods", "lockheed",
        "merck", "microsoft", "nvidia", "netflix", "oracle", "pepsico", "pfizer", "qualcomm", "royal caribbean",
        "slack", "spotify", "starbucks", "tesla", "twitter", "uber", "verizon", "walmart", "xilinx",
        "yeti", "zoom"]

    const companySymbols = ["amzn", "bud", "aapl", "brk.b", "ba", "bp", "cost", "dis", "xom", "fb", "f", "ge",
        "hd", "ibm", "intc", "jpm", "jnj", "khc", "lmt", "mrk", "msft", "nvda", "nflx", "orcl", "pep", "pfe", "qcom",
        "rcl", "work", "spot", "sbux", "tsla", "twtr", "uber", "vz", "wmt", "xlnx", "yeti", "zm"]


    searchBar.addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {  // 13 == e.keyCode with heyDown
            const searchValue = searchBar.value;
            if (searchValue) {
                if (companyNames.includes(searchValue.toLowerCase())) {
                    window.location.href = `/stocks/${toTitleCase(searchValue)}`;
                } else if (companySymbols.includes(searchValue.toLowerCase())) {
                    window.location.href = `/stocks/${searchValue.toUpperCase()}`;
                }
                else {
                    alert("Please enter a valid company name or symbol.");
                }
            } else {
                alert("Please enter a company name or symbol.");
            }
        }
    });
});
function toTitleCase(string) { //"jpmorgan chase"
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function toTitleCase(string) { //"jpmorgan chase"
//     let words = string.split(" ");// ["jpmorgan", "chase"]
//     words.map(word => {
//         return word.charAt(0).toUpperCase() + word.slice(1);
//     })
//     return words.join(" ");
// }

