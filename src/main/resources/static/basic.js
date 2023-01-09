let targetId;

//$(document).ready(): 페이지를 새로고침 or 접속할 때 마다 해당 함수 호출 및 실행
$(document).ready(function () {
    // id 가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행하라는 뜻입니다.
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    $('.nav div.nav-see').on('click', function () {
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
    })
    $('.nav div.nav-search').on('click', function () {
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
    })

    $('#see-area').show();
    $('#search-area').hide();

    showProduct();
})

//숫자 단위마다 컴마(,)를 추가
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//네이버 검색 API 실행
function execSearch() {
    $('#search-result-box').empty();
    /**
     * 검색어 input id: query
     * 검색결과 목록: #search-result-box
     * 검색결과 HTML 만드는 함수: addHTML
     */
        // 1. 검색창의 입력값을 가져온다.
    let query = $('#query').val();

    // 2. 검색창 입력값을 검사하고, 입력하지 않았을 경우 focus.
    if (query == '') {
        alert('검색어를 입력해주세요.')
        $('#query').focus();
    }

    // 3. GET /api/search?query=${query} 요청
    // ``(백틱): 문자열 중간에 변수값을 넣을 때 사용 + 값을 넣는 형태: ${'값'}
    // contentTypte, data는 POST, PUT 요청에서만 사용
    // ItemDto에 들어갈 리스트가 response안에 있다 -> sucess의 파라미터로 사용
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            if (response.length == 0) {
                alert(query + '에 대한 검색 결과가 없습니다.');
            }
            for (let i = 0; i < response.length; i++) {
                //title, image, link, lprice 값들
                let itemDto = response[i];

                //4개의 값이 HTML형태로 보인다
                let tempHtml = addHTML(itemDto);

                //검색 결과에 해당하는 모든 HTML 파일이 보인다
                $('#search-result-box').append(tempHtml);

            }
        }
    })

    // 4. for 문마다 itemDto를 꺼내서 HTML 만들고 검색결과 목록에 붙이기!

}

//검색 결과를 HTMl형태로 나타내기
function addHTML(itemDto) {
    /**
     * class="search-itemDto" 인 녀석에서
     * image, title, lprice, addProduct 활용하기
     * 참고) onclick='addProduct(${JSON.stringify(itemDto)})'
     */
    //관심상품 생성을 위해 addProduct 호출 -> 파라미터 ${JSON.stringify(itemDto)
    //-> itemDto는 JSON형태(서버)이고 필요한 값은 String형태(JAVA)가 필요
    //JSON.stringify(itemDto) 사용 - JSON 값을 문자열 형태로 변환 
    return `<div class="search-itemDto">
            <div class="search-itemDto-left">
                <img src="${itemDto.image}" alt="">
            </div>
            <div class="search-itemDto-center">
                <div>${itemDto.title}</div>
                <div class="price">
                    ${numberWithCommas(itemDto.lprice)}
                    <span class="unit">원</span>
                </div>
            </div>
            <div class="search-itemDto-right">
                <img src="images/icon-save.png" alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
            </div>
        </div>`
}


//파라미터로 전달받은 itemDto(JSON 형태의 문자열)는 자바스크립트가 자동적으로 JSON형태로 변환시킨다
//따라서 JSON.stringify()를 한번 더 사용
function addProduct(itemDto) {
    /**
     * modal 뜨게 하는 법: $('#container').addClass('active');
     * data를 ajax로 전달할 때는 두 가지가 매우 중요
     * 1. contentType: "application/json",
     * 2. data: JSON.stringify(itemDto),
     */
    // 1. POST /api/products 에 관심 상품 생성 요청
    $.ajax({
        type: 'POST',
        url: '/api/products',
        data: JSON.stringify(itemDto),
        contentType: 'application/json',
        success: function (response) {
            $('#container').addClass('active');

            // 2. 응답 함수에서 modal(팝업창)을 뜨게 하고, targetId 를 reponse.id 로 설정 (숙제로 myprice 설정하기 위함)
            targetId = response.id;
        }
    })
}

function showProduct() {

    /**
     * 관심상품 목록: #product-container
     * 검색결과 목록: #search-result-box
     * 관심상품 HTML 만드는 함수: addProductItem
     */
    // 1. GET /api/products 요청
    $.ajax({
            type: 'GET',
            url: '/api/products',
            success: function (response) {
                // 2. 관심상품 목록, 검색결과 목록 비우기
                $('#product-container').empty();
                $('#search-result-box').empty();

                //3. for 문마다 관심 상품 HTML 만들어서 관심상품 목록 붙이기
                for (let i = 0; i < response.length; i++) {
                    let product = response[i];
                    let tempHtml = addProductItem(product);
                    $('#product-container').append(tempHtml);

                }
            }
        }
    )

}

function addProductItem(product) {
    // link, image, title, lprice, myprice 변수 활용하기
    return `<div class="product-card" onclick="window.location.href='${product.link}'">
            <div class="card-header">
                <img src="${product.image}"
                     alt="">
            </div>
            <div class="card-body">
                <div class="title">
                    ${product.title}
                </div>
                <div class="lprice">
                    <span>${numberWithCommas(product.lprice)}</span>원
                </div>
                
                <!--삼항연산자-->
                <div class="isgood ${product.lprice <= product.myprice ? '' : 'none'}">
                    최저가
                </div>
            </div>
        </div>`;
}

function setMyprice() {

      // 1. id가 myprice 인 input 태그에서 값을 가져온다.
      let myprice  = $('#myprice').val();

     // 2. 만약 값을 입력하지 않았으면 alert를 띄우고 중단한다.
    if(myprice == ''){
        alert('값을 입력해주세요');
        return;
    }

     //3. PUT /api/products/${targetId} 에 data를 전달한다.
    //주의) contentType: "application/json",
    //data: JSON.stringify({myprice: myprice})
    $.ajax({
        type: 'PUT',
        url: `/api/products/${targetId}`,
        contentType: 'application/json',
        data: JSON.stringify({'myprice' : myprice}),
        success: function (response) {
            //4. 모달을 종료한다. $('#container').removeClass('active');
            $('#container').removeClass('active');
            //5. 성공적으로 등록되었음을 알리는 alert를 띄운다.
            alert('최저가 알림이 설정되었습니다.');
            //6. 창을 새로고침한다. window.location.reload();
            window.location.reload();
        }
    })
}