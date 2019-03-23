document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".search").onkeyup = () => {
        search();
    };

    const search = () => {
        let input, filter, table,  tr, td, i, value;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if(td) {
                value = td.textContent || td.innerText;
                if(value.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    };
});

