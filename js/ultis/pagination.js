export function renderPagination(paginationElementId, pagination) {
    if(!pagination) return;
    
    const ulPagnation = document.querySelector(paginationElementId);
    if(!ulPagnation) return;

    const {_page, _limit, _totalRows} = pagination;
    const totalRows = Math.ceil(_totalRows / _limit);

    ulPagnation.dataset.page = _page;

    var a = new URL(window.location);
    if(a.searchParams.get("title_like")) {
        ulPagnation.firstElementChild?.classList.add("disabled");
        return;
    }
    
    ulPagnation.dataset.totalPage = totalRows;
    
    if(_page <= 1) {
        ulPagnation.firstElementChild?.classList.add("disabled");
    }else {
        ulPagnation.firstElementChild?.classList.remove("disabled");
    }

    if(_page >= totalRows) {
        ulPagnation.lastElementChild?.classList.add("disabled");
    }else {
        ulPagnation.lastElementChild?.classList.remove("disabled");
    }
}
export function handleEvent({elementId, queryParams, onChange}) {
    const ulPagnation = document.getElementById(elementId);
    if(!ulPagnation) return;
    
    var prevElement = ulPagnation.querySelector("#prev");
    if(!prevElement) return;

    var nextElement = ulPagnation.querySelector("#next");
    if(!nextElement) return;

    prevElement.addEventListener("click", (e) => {
        e.preventDefault();

        var _page = ulPagnation.dataset.page;
        if(_page > 1) onChange(+_page - 1);
    });
    nextElement.addEventListener("click", (e) => {
        e.preventDefault();
           
        var _totalRows = ulPagnation.dataset.totalPage;
        var _page = ulPagnation.dataset.page;
        if(+_page < +_totalRows) onChange(+_page + 1);
    });
}