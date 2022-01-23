package com.timetable.di.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timetable.di.mapper.ClassMapper;
import com.timetable.di.service.ClassService;
import com.timetable.di.vo.ClassVO;

@Service
public class ClassServiceImpl implements ClassService{

	@Autowired ClassMapper classMapper;
	
	@Override
	public List<ClassVO> selectClassesOfMajorNo(String major_no) {
		return classMapper.selectAllClasses(major_no);
		
	}

	@Override
	public List<ClassVO> selectAllMajor() {
		return classMapper.selectAllMajor();
	}

	
	
}
