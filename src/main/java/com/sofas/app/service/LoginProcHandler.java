package com.sofas.app.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sofas.app.bean.MemberDto;
import com.sofas.app.dao.MemberDao;


public class LoginProcHandler implements CommonHandler {

	@Override
	public String process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		
		MemberDao dao = new MemberDao();
	//	MemberDto dto = dao.loginMember1(id, pw);
		MemberDto dto = null;
		if(dto.getMember_idx() > 0) {
			HttpSession session = request.getSession();
			session.setAttribute("memberInfo", dto);
			return "Home.do";
		} else {
			return "/login.jsp?err=0";
		}
	}
}
