<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script>const contextPath = '${pageContext.request.contextPath}';</script>
<script type="text/javascript" src="./js/schedule.js"></script>
<style>
.btn_span {
	margin : 10px;
	padding : 5px;
	border : 1px solid #ccc;
	cursor : pointer;
	/* line-height: 50px; */
	display: inline-block;
}
.card {
	margin : 10px;
	padding : 10px;
}

.span_outer {
	min-height: 50px;
	border : 1px solid #black;
}

.active_span {
	background-color : #81c784;
}
.outer {
	border : 1px solid #ccc;
}
#canvas {
	margin : 0 auto;
}

#canvas > .day {
	float: left;
	width: 18%;
	margin-bottom : 70px;
}
#canvas > .left {
	float: left;
	width: 9%;
	margin-bottom : 70px;
}



#canvas > .day_title {
	float: left;
	width: 18%;
}


.time {
	border : 1px solid #ccc;
	border-collapse: collapse;
	height : 60px;
}

.time, .time_filled{
    display: flex;
    align-content: space-between;
    justify-content: center;
    flex-direction: row;
    align-items: center;
}	

.day > .time_filled {
	border : 1px solid #ccc;
	height : 122px;
}


</style>
</head>
<body>
<div id="search_box">
	<div class="card outer" id="major">
		학과입력 <input id="major_query" type="text" placeholder="학과를 입력하세요"/>
	</div>
	<div class="card outer" id="major_recommand_outer">
		학과선택
		<div class="card" class="span_outer" id="major_recommand">학과를 검색하세요</div>
	</div>
	<div class="card outer" id="class_choice_outer">
		수업선택(<span id="total_credit">0</span>학점)
		<div class="card" class="span_outer" id="class_choice">학과를 선택하세요</div>
	</div>
	<div id="btn_area" class="card">
		<button onClick="generateSchedule()">시간표생성</button>
	</div>
</div>
<hr>
<div id="schedule_box" class="card">
	<div>시간표 자동생성<span id="idx"></span></div>
	<div id="canvas"></div>
</div>

</body>
</html>