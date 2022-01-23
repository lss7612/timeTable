package com.timetable.di.service;

import java.util.List;

import com.timetable.di.vo.ClassVO;

public interface ClassService {

	public List<ClassVO> selectClassesOfMajorNo(String major_no);

	public List<ClassVO> selectAllMajor();

}
