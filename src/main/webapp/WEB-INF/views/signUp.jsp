<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="resources/css/sign_up.css" type="text/css">
    <link rel="stylesheet" href="resources/css/common.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="resources/script/href_util.js" defer></script>
    <script type="text/javascript" src="resources/script/sign_up.js" defer></script>
    <!-- 우편번호 찾기 script -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- 새로고침시 페이지 제일 위로 -->
    <script>history.scrollRestoration = "manual"</script>
    <title>SOFAS KOREA</title>
</head>
<body>	
	<c:set var="err" value="${param.err}" />
	<c:if test="${!empty err and err eq '0'}">
		<script>alert("Error : 회원가입에 실패하였습니다.");</script>
	</c:if>
	
	<aside class="page_back" onclick="go_prevPage()"><i class="fas fa-arrow-left"></i></aside>
    <section class="sign_up_scr_wrap">
        <article class="img_area">
            <img src="resources/img/home/signUp_img.webp" alt="signUp_img">
        </article>
        <article class="sign_up_area">
            <form class="sign_up_form" name="sign_up_form" method="POST">
                <h1>회원가입</h1>
                <div class="sign_up_info">
                    <div class="duplication_check">중복 확인</div>
                    <input type="text" name="id" id="id" autocomplete="off">
                    <label for="id" class="label_id">아이디를 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>
                <div class="sign_up_info">
                    <input type="password" name="pw" id="pw" autocomplete="off">
                    <label for="pw" class="label_pw">비밀번호를 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>
                <div class="sign_up_info">
                    <input type="text" name="member_name" id="member_name" autocomplete="off">
                    <label for="member_name" class="label_name">이름을 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>
                <div class="sign_up_info">
                    <input type="email" name="email" id="email" autocomplete="off">
                    <label for="email" class="label_email">이메일을 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>
                <div>
                    <button type="button" class="find_postcode" onclick="findPostcode()">우편번호 찾기</button>
                </div>
                <div class="sign_up_info">
                    <input type="text" name="postcode" id="postcode" readonly>
                    <label for="postcode" class="label_postcode">우편번호</label>
                    <div class="alert_msg"></div>
                </div>
                <div class="sign_up_info">
                    <input type="text" name="roadAddress" id="roadAddress" readonly>
                    <label for="roadAddress" class="label_roadAddress">도로명 주소</label>
                    <div class="alert_msg"></div>
                </div>
                <div class="sign_up_info">
                    <input type="text" name="detailAddress" id="detailAddress" autocomplete="off">
                    <label for="detailAddress" class="label_detailAddress">상세주소를 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>
                <input type="hidden" name="address" id="address">
                <div class="sign_up_info">
                    <input type="text" name="phone" id="phone" autocomplete="off">
                    <label for="phone" class="label_phone">휴대폰 번호를 입력하세요.</label>
                    <div class="alert_msg"></div>
                </div>

                <ul class="agree_area">
                    <li>
                        <label for="clause" class="label_clause">
                            <input type="checkbox" id="clause">(필수) 약관을 모두 읽고 동의합니다.
                        </label>
                        <a href="#a">이용약관</a>
                        <div class="alert_msg"></div>
                    </li>
                    <li>
                        <label for="collection" class="label_collection">
                            <input type="checkbox" id="collection">(필수) 개인정보 수집ㆍ이용에 동의합니다.
                        </label>
                        <a href="#a">개인정보 수집ㆍ이용 동의</a>
                        <div class="alert_msg"></div>
                    </li>
                    <li>
                        <label for="commission" class="label_commission">
                            <input type="checkbox" id="commission">(필수) 개인정보 처리 위탁에 동의합니다.
                        </label>
                        <a href="#a">개인정보 처리 위탁</a>
                        <div class="alert_msg"></div>
                    </li>
                    <li>
                        <label for="relocate" class="label_relocate">
                            <input type="checkbox" id="relocate">(필수) 개인정보 국외이전에 동의합니다.
                        </label>
                        <a href="#a">개인정보 국외이전</a>
                        <div class="alert_msg"></div>
                    </li>
                </ul>
                <button type="button" class="sign_up_submit">입력 정보 제출하기</button>
            </form>
        </article>
    </section>
</body>
</html>