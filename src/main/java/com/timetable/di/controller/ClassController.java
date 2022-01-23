package com.timetable.di.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.timetable.di.service.ClassService;
import com.timetable.di.vo.ClassVO;

@Controller
public class ClassController {

	@Autowired ClassService classService;
	
	@GetMapping("/classes")
	@ResponseBody
	public Map<String, Object> getClasses(String major_no) {
		
		List<ClassVO> classList = classService.selectClassesOfMajorNo(major_no);
		
		Map<String, Object> result = new HashMap<>();
		result.put("classList", classList);
		return result;
		
	}
	
	@GetMapping("/major")
	@ResponseBody
	public Map<String, Object> getMajor(String major_no) {
		
		List<ClassVO> majorList = classService.selectAllMajor();
		
		Map<String, Object> result = new HashMap<>();
		result.put("majorList", majorList);
		return result;
		
	}
	
	
}
