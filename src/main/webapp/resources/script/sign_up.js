$(document).ready(function () {
    // 가입 양식 부분
    $(".sign_up_area input[name=id]").on({
        focus:	function() { focusLabel(".label_id"); this.select() },
        blur:	function() { if($(this).val() == "") blurLabel($(".label_id")); },
        keyup: 	function() {
            var input_val = $(this).val();
            var label = $(".label_id");
            // 아이디 양식 조건
            if(input_val.length < 4) {
                $(label).next().text("아이디는 4자 이상이여야 합니다.");
            } else if(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input_val)) {
                $(label).next().text("아이디는 영문자와 숫자만 가능합니다.");
            } else if(/\s/g.test(input_val) || /[`~!@#$%^&*()|\\\'\";:\/?]/gi.test(input_val)) {
                $(label).next().text("공백 문자, 특수 문자는 사용할 수 없습니다.");
            } else {
                $(label).next().text("");
            }
        }
    });
    $(".sign_up_area input[name=pw]").on({
        focus:	function() { focusLabel(".label_pw"); this.select() },
        blur:	function() { if($(this).val() == "") blurLabel($(".label_pw")); },
        keyup: 	function() {
            var input_val = $(this).val();
            var label = $(".label_pw");
            // 비밀번호 양식 조건
            if(!/^[a-zA-Z0-9]{6,18}$/.test(input_val)) {
                $(label).next().text("비밀번호는 영문자와 숫자 조합으로 6자리 이상, 18자리 이하여야 합니다.");
            } else if(input_val.search(/[0-9]/g) < 0 || input_val.search(/[a-z]/ig) < 0) {
                $(label).next().text("비밀번호는 영문자와 숫자를 혼용하여야 합니다.");
            } else {
                $(label).next().text("");
            }
        }
    });
    $(".sign_up_area input[name=member_name]").on({
        focus:	function() { focusLabel(".label_name"); this.select() },
        blur:	function() { if($(this).val() == "") blurLabel($(".label_name")); },
        keyup: 	function() {
            var input_val = $(this).val();
            var label = $(".label_name");
            // 이름 양식 조건
            if (/\s/g.test(input_val) || /[`~!@#$%^&*()|\\\'\";:\/?]/gi.test(input_val)) {
                $(label).next().text("공백 문자, 특수 문자는 사용할 수 없습니다.");
            } else {
                $(label).next().text("");
            }
        }
    });
    $(".sign_up_area input[name=email]").on({
        focus: function() { focusLabel(".label_email"); this.select() },
        blur:  function() { if($(this).val() == "") blurLabel($(".label_email")); },
        keyup: function() {
            var input_val = $(this).val();
            var label = $(".label_email");
            // 이메일 양식 조건
            if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(input_val)) {
                $(label).next().text("이메일 형식이 올바르지 않습니다.");
            } else {
                $(label).next().text("");
            }
        }
    });
    $(".sign_up_area input[name=phone]").on({
        focus:	function() { focusLabel(".label_phone"); this.select() },
        blur:	function() { if($(this).val() == "") blurLabel($(".label_phone")); },
        keyup:	function() {
        	var input_val = $(this).val();
        	var label = $(".label_phone");
            // 전화번호 양식 조건
            if (!/^\d{10,11}$/.test(input_val) || !/^01[01679]/.test(input_val)) {
                $(label).next().text("휴대폰 번호가 올바르지 않습니다. ( - 를 제외한 10~11자 번호 )");
            } else {
                $(label).next().text("");
            }
        }
    });
    $(".sign_up_area input[name=detailAddress]").on({
        focus: function() { focusLabel(".label_detailAddress"); this.select() },
        blur:  function() { if($(this).val() == "") blurLabel($(".label_detailAddress")); },
        keyup: function() {
            var input_val = $(this).val();
            var label = $(".label_detailAddress");
            // 상세주소 양식 조건
            if (/[//]/gi.test(input_val)) {
                $(label).next().text("// 문자는 사용할 수 없습니다.");
            } else {
                $(label).next().text("");
            }
        }
    });

    // 필수 동의서 체크 부분
    var clause_text = "약관을 읽고 동의해야 합니다.";
    $(".agree_area #clause").on({
        click: function () {
            clickLabel(".agree_area input[id=clause]", ".label_clause", clause_text);
        }
    });
    var collection_text = "개인정보 수집ㆍ이용에 대한 동의를 해야합니다.";
    $(".agree_area #collection").on({
        click: function () {
            clickLabel(".agree_area input[id=collection]", ".label_collection", collection_text);
        }
    });
    var commission_text = "개인정보 처리 위탁에 대한 동의를 해야합니다.";
    $(".agree_area #commission").on({
        click: function () {
            clickLabel(".agree_area input[id=commission]", ".label_commission", commission_text);
        }
    });
    var relocate_text = "개인정보 국외이전에 대한 동의를 해야합니다.";
    $(".agree_area #relocate").on({
        click: function () {
            clickLabel(".agree_area input[id=relocate]", ".label_relocate", relocate_text);
        }
    });
    
    // 아이디 중복 확인
    var id_duplication_check = false;
    $(".duplication_check").on({
    	click: function() {
    		var id_val = $(".sign_up_area input[name=id]").val();
    		var data = {pg: "signUp", id:id_val}
    		id_duplication_check = false;
    		$.ajax({
    			type: "post",
    			url: "AjaxProc.do",
    			data:JSON.stringify(data),
    			contentType:"application/json; charset=utf8",
    			dataType: "json",
				success:function(args){
					if (id_val == "" || id_val.length < 4 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(id_val) 
							|| /\s/g.test(id_val) || /[`~!@#$%^&*()|\\\'\";:\/?]/gi.test(id_val)) {
					        // 아이디 - 공백, 4자이하, 한글/공백/특수문자 제외
						$(".label_id").next().css("color","red");
						$(".sign_up_area input[name=id]").focus();
					} else if(args.cnt > 0) {
						$(".label_id").next().css("color","red");
						$(".label_id").next().text("이미 사용중인 아이디입니다.");	
					} else {
						$(".label_id").next().css("color","green");
						$(".label_id").next().text("사용 가능한 아이디입니다.");
						id_duplication_check = true;
					}
				},					
				error:function(args){	
					$(".label_id").next().text(args.responseText+" 에러!");
				}
    		});
    	}
    });
    
    // 회원가입 모든 조건 만족 시 submit
    $(".sign_up_submit").on({
    	click:function() {
    	    // checkbox 
    	    var clause = $(".agree_area input[id=clause]").prop("checked");
    	    var collection = $(".agree_area input[id=collection]").prop("checked");
    	    var commission = $(".agree_area input[id=commission]").prop("checked");
    	    var relocate = $(".agree_area input[id=relocate]").prop("checked");
    	    var agree_success_chk = false;
    	    if (!clause) {
    	        $(".label_clause").next().next().text("약관을 읽고 동의해야 합니다.");
    	    }
    	    if (!collection) {
    	        $(".label_collection").next().next().text("개인정보 수집ㆍ이용에 대한 동의를 해야합니다.");
    	    }
    	    if (!commission) {
    	        $(".label_commission").next().next().text("개인정보 처리 위탁에 대한 동의를 해야합니다.");
    	    }
    	    if (!relocate) {
    	        $(".label_relocate").next().next().text("개인정보 국외이전에 대한 동의를 해야합니다.");
    	    }
    	    if (clause && collection && commission && relocate) {
    	        agree_success_chk = true;
    	    }

    	    // tel
    	    var tel = $(".sign_up_info input[name=phone]");
    	    var tel_success_chk = false;
    	    if (tel.val() == "") {
    	        $(".label_phone").next().text("필수 입력사항입니다.");
    	        $(tel).focus();
    	    } else if (!/^\d{10,11}$/.test(tel.val()) || !/^01[01679]/.test(tel.val())) {
    	        $(tel).focus();
    	    } else {
    	        tel_success_chk = true;
    	    }

    	    // postcode, roadAddress, detailAddress
    	    var postcode = $(".sign_up_info input[name=postcode]");
    	    var roadAddress = $(".sign_up_info input[name=roadAddress]");
    	    var detailAddress = $(".sign_up_info input[name=detailAddress]");
    	    var roadAddress_success_chk = false;
    	    var detailAddress_success_chk = false;
    	    if (postcode.val() == "" || roadAddress.val() == "") {
    	        $(".label_postcode").next().text("필수 입력사항입니다.");
    	        $(".label_roadAddress").next().text("필수 입력사항입니다.");
    	    } else {
    	        roadAddress_success_chk = true;
    	    }
    	    if (detailAddress.val() == "") {
    	        $(".label_detailAddress").next().text("필수 입력사항입니다.");
    	        $(detailAddress).focus();
    	    } else if(/[//]/gi.test(detailAddress.val())) {
    	    	$(detailAddress).focus();
    	    } else {
    	        detailAddress_success_chk = true;
    	    }

    	    // email
    	    var email = $(".sign_up_info input[name=email]");
    	    var email_success_chk = false;
    	    if (email.val() == "") {
    	        $(".label_email").next().text("필수 입력사항입니다.");
    	        $(email).focus();
    	    } else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email.val())) {
    	        // 이메일 양식
    	        $(email).focus();
    	    } else {
    	        email_success_chk = true;
    	    }

    	    // name
    	    var name = $(".sign_up_info input[name=member_name]");
    	    var name_success_chk = false;
    	    if (name.val() == "") {
    	        $(".label_name").next().text("필수 입력사항입니다.");
    	        $(name).focus();
    	    } else if (/\s/g.test(name.val()) || /[`~!@#$%^&*()|\\\'\";:\/?]/gi.test(name.val())) {
    	        $(name).focus();
    	    } else {
    	        name_success_chk = true;
    	    }

    	    // pw
    	    var pw = $(".sign_up_info input[name=pw]");
    	    var pw_success_chk = false;
    	    if (pw.val() == "") {
    	        $(".label_pw").next().text("필수 입력사항입니다.");
    	        $(pw).focus();
    	    } else if (!/^[a-zA-Z0-9]{6,18}$/.test(pw.val()) || pw.val().search(/[0-9]/g) < 0 || pw.val().search(/[a-z]/ig) < 0) {
    	        // 비밀번호 - 6자 이상, 18자 이하, 영문/숫자 혼합 
    	        $(pw).focus();
    	    } else {
    	        pw_success_chk = true;
    	    }

    	    // id
    	    var id = $(".sign_up_info input[name=id]");
    	    var id_success_chk = false;
    	    if (id.val() == "") {
    	        $(".label_id").next().text("필수 입력사항입니다.");
    	        $(id).focus();
    	    } else if (id.val().length < 4 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(id.val()) || /\s/g.test(id.val()) || /[`~!@#$%^&*()|\\\'\";:\/?]/gi.test(id.val())) {
    	        // 아이디 - 4자이하, 한글/공백/특수문자 제외
    	        $(id).focus();
    	    } else {
    	        id_success_chk = true;
    	    }
    	    
    	    // 중복 불가 
    	    if(!id_duplication_check) {
    	    	$(".label_id").next().text("중복 확인이 필요합니다");
    	    	$(id).focus();
    	    }

    	    // 모든 조건 만족 시 submit
    	    if (id_duplication_check && agree_success_chk && tel_success_chk && roadAddress_success_chk && detailAddress_success_chk
    	        && email_success_chk && name_success_chk && pw_success_chk && id_success_chk) {
    	        // 로그인 서브밋 처리
    	        $("#address").val(postcode.val()+"//"+roadAddress.val()+"//"+detailAddress.val());

    	    	document.sign_up_form.action = "SignUpProc.do";
    	    	document.sign_up_form.submit();
    	    }
    	}
    });
});

// sign_up_info label 이동
function focusLabel(label) {
    $(label).stop().animate({
        top: 0, zoom: 0.75
    }, 500);
}
function blurLabel(label) {
    $(label).next().text("필수 입력사항입니다.");
    $(label).stop().animate({
        top: 26, zoom: 1
    }, 500);
}

// 우편번호 찾기
function findPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행 코드.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("postcode").value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;

            // 상세주소 입력칸으로 포커스 주기
            focusLabel(".label_postcode");
            focusLabel(".label_roadAddress");
            // 필수 입력사항 안내 해제 
            $(".label_postcode").next().text("");
            $(".label_roadAddress").next().text("");

            // 선택 완료 후 상세주소에 포커싱
            document.getElementById("detailAddress").focus();
        }
    }).open();
}

// 약관 동의 미확인 문구 안내
function clickLabel(checkbox, labelName, text) {
    if (!$(checkbox).prop("checked")) {
        $(labelName).next().next().text(text);
    } else {
        $(labelName).next().next().text("");
    }
}
