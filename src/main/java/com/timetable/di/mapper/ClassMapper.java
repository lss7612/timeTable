package com.timetable.di.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.timetable.di.vo.ClassVO;

@Mapper
public interface ClassMapper {

	@Select("SELECT A.*,B.MAJOR_NAME FROM TT_CLASS A"
			+" INNER JOIN TT_MAJOR B "
			+" ON B.MAJOR_NO = #{major_no} AND A.MAJOR_NO = B.MAJOR_NO")
	public List<ClassVO> selectAllClasses(@Param("major_no") String major_no);

	@Select("SELECT * FROM TT_MAJOR")
	public List<ClassVO> selectAllMajor();

}
