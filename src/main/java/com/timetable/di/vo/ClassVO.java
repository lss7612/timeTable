package com.timetable.di.vo;

public class ClassVO {
	
	//TT_MAJOR
	private String major_no;
	private String major_name;
	
	//TT_CLASS
	private String class_no;
	private String class_name;
	private String credit;
	private String time;
	
	public String getMajor_no() {
		return major_no;
	}
	public void setMajor_no(String major_no) {
		this.major_no = major_no;
	}
	public String getMajor_name() {
		return major_name;
	}
	public void setMajor_name(String major_name) {
		this.major_name = major_name;
	}
	public String getClass_no() {
		return class_no;
	}
	public void setClass_no(String class_no) {
		this.class_no = class_no;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public String getCredit() {
		return credit;
	}
	public void setCredit(String credit) {
		this.credit = credit;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	@Override
	public String toString() {
		return "ClassVO [major_no=" + major_no + ", major_name=" + major_name + ", class_no=" + class_no
				+ ", class_name=" + class_name + ", credit=" + credit + ", time=" + time + ", getMajor_no()="
				+ getMajor_no() + ", getMajor_name()=" + getMajor_name() + ", getClass_no()=" + getClass_no()
				+ ", getClass_name()=" + getClass_name() + ", getCredit()=" + getCredit() + ", getTime()=" + getTime()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
}
