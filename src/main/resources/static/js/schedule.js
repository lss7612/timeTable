let major_list = null;
let start_time = 9;
let end_time = 17; 
let static_arr_active = new Array();;
let schedule_idx = 0;
const colors = ['#ffcdd2','#f8bbd0','#d1c4e9','#c5cae9','#bbdefb','#b2ebf2','#b2dfdb','#c8e6c9','#dcedc8','#f0f4c3','#fff9c4','#ffecb3','#ffe0b2'];

let week_now = null;
let week_list = new Array();

document.addEventListener("DOMContentLoaded",function(){
	
	getMajor();
	
	
	let major_query = document.getElementById('major_query')
	major_query.addEventListener('keyup',()=>{
		let query = major_query.value;
		major_list.forEach(major => {
			let major_recommand = document.getElementById('major_recommand');
			let outer = document.getElementById('major_recommand_outer');
			if(query != '') {
				if(major.major_name.includes(query)) {
					if(!major_recommand.innerHTML.includes(`major_no="${major.major_no}"`)) {
						major_recommand.innerHTML = 
							`<span class="btn_span" major_no="${major.major_no}" onclick="getClasses(this)">
								${major.major_name}
							</span>`;
					}
				} else {
					major_recommand.innerHTML = `"${query}" 검색결과 없음`;
				}
			} else {
				major_recommand.innerHTML = `학과를 검색하세요`;
			}
		})
	})
	
})

function showRecommand(major) {
	
	let major_recommand = document.getElementById('major_recommand');
	major_recommand.innerHTML = major.major_name;
	
}

function getMajor() {
	$.ajax({
		method : 'GET',
		url : contextPath + '/major',
		dataType : 'JSON',
		success : (res)=>{
			major_list = res.majorList;
		},
		error : ()=> {
			console.log('실패')
		}
	})
}

function getClasses(dom) {
	activeSwitch(dom);
	let major_no = dom.getAttribute('major_no');
	$.ajax({
		method : 'GET',
		url : contextPath + '/classes',
		dataType : 'JSON',
		data : {major_no : major_no},
		success : (res)=>{
			makeClassDom(res.classList);
		},
		error : ()=> {
			console.log('실패')
		}
	})
}

function makeClassDom(classList) {
	let class_choice = document.getElementById('class_choice');
	class_choice.innerHTML ='';
	classList.forEach(cl => {
		class_choice.innerHTML += 
			`<span  class="btn_span" 
					class_no="${cl.class_no}" 
					credit="${cl.credit}"
					time=${cl.time} 
					onclick="calCredit(this)">${cl.class_name}(${cl.credit}학점)</span>`;
	})
	
}

function calCredit(dom){
	
	if(dom != undefined) {
		activeSwitch(dom);
	}
	
	let total = document.getElementById('total_credit');
	total.innerHTML = 0;
	let credit = 0;
	
	document.getElementById('class_choice').querySelectorAll('.btn_span').forEach(item => {
		if(item.classList.contains('active_span')) credit += item.getAttribute('credit') * 1;
	})
	total.innerHTML = credit;
	
}

function activeSwitch(dom) {
	if(dom.classList.contains('active_span')) dom.classList.remove('active_span');
	else dom.classList.add('active_span');
}

function generateSchedule(){
	
	calCredit();
	let total_credit = document.getElementById('total_credit').innerHTML * 1;
	if(total_credit < 18 || total_credit > 21) {
		alert('학점은 18 ~ 21까지 선택 가능합니다.')
		return;
	} 
	
	const arr_active = new Array();
	document.getElementById('class_choice').querySelectorAll('.btn_span').forEach(item => {
		if(item.classList.contains('active_span')) {
			arr_active.push(new Class(item.innerHTML, item.getAttribute('time')));
		}
	})
//	static_arr_active = arr_active;
	arr_active.forEach(item => static_arr_active.push(item));
	const week = new Week(arr_active, 5);
	week.init();
	
	week.setClassOnDay();
	draw(week.week, true);
	
	changeBtnArea();
	
	
}

function draw(days, add) {
	if(add) {
		week_list.push(days);
		schedule_idx++;
	}
	
	//컬러 초기화
	const colors = ['#ffcdd2','#f8bbd0','#d1c4e9','#c5cae9','#bbdefb','#b2ebf2','#b2dfdb','#c8e6c9','#dcedc8','#f0f4c3','#fff9c4','#ffecb3','#ffe0b2'];
	
	//캔버스 초기화
	let canvas = document.getElementById('canvas');
	canvas.innerHTML = '';
	
	let dom = '';
	
	//왼쪽 서식 그리기
	let times = new Array();
	for(let i = start_time; i < end_time; i++) {
		times.push(`${i} ~ ${i+1}`);
	}
	dom+= `<div class="left">`
		for(let i = 0; i < days[0].arr.length + 1; i++) {
			if(i == 0) {
				dom += `<div class="time"></div>`
			} else {
				dom += `<div class="time">${times.shift()}</div>`
			}
		}
	dom += `</div>`
		
	let day_names = ['월','화','수','목','금','토','일'];
	//상단 서식 그리기
//	dom += `<div class="title_box">`;
	days.forEach(day => {
		dom += `<div class="day_title"><div class="time">${day_names.shift()}</div></div>`;
	})
//	dom += `</div>`;
	
	
	
	//스케쥴 그리기
	let heigth = days[0].length + 1;
	
	days.forEach((day,idx) => {
		
		//월 ~ 일 시간표 그리기
		dom += `<div class="day" day="idx">`;
		for(let i = 0; i < day.arr.length; i++) {
			let time = day.arr[i];
			if(time.isFilled) {
				dom += `<div class="time_filled" style="background-color:${colors.pop()};">
							<span>${time.cl.name}</span><br/>
						</div>`;
				i += time.cl.time-1;
			} else {
				dom += `<div class="time" time="${idx}"></div>`;
			}
		}
		dom += `</div>`;
	});
	canvas.innerHTML += dom;
	showIndex();
	
	return true;
}

function showIndex() {
	document.getElementById('idx').innerHTML=`(${schedule_idx * 1} / ${week_list.length})`;
}

function Week(classes, cnt) {
	this.arr_class = classes;
	this.rest_class = classes;
	this.week = new Array(cnt);
	this.init = ()=>{
		for(let i = 0; i < this.week.length; i++) {
			this.week[i] = new Day(start_time, end_time).init();
		}
	}
	this.setClassOnDay = () => {
		let ran = getRanNum(this.week.length-1);
		this.rest_class = this.week[ran].setClassOnTime(this.rest_class);
		if(this.rest_class.length==0) {
			return true;
		} else {
			this.setClassOnDay(this.rest_class);
		}
	}
}

function Class(name, time){
	this.name = name;
	this.time = time;
}


function Day(start_time, end_time) {
	this.arr = new Array(end_time - start_time);
	this.init = ()=>{
		for(let i = 0; i < this.arr.length; i++) {
			this.arr[i] = new Time();
		}
		return this;
	}
	this.setClassOnTime = (arr_class)=>{
		let ran = getRanNum(this.arr.length-1);
		if(    !this.arr[ran].isFilled //해당 교시에 수업이 없고
			&& (this.arr[ran-1] !== undefined && !this.arr[ran-1].isFilled) //해당 교시 전에 수업이 없고
			&& (this.arr[ran+1] !== undefined && !this.arr[ran+1].isFilled) //해당 교시 다음에 수업이 없을 때
			&& ran != 0
			) {
			let cl = arr_class.pop();
			this.arr[ran].setClass(cl);
		}
		else if(    !this.arr[ran].isFilled //해당 교시에 수업이 없고
				&& (this.arr[ran+1] !== undefined && !this.arr[ran+1].isFilled) //해당 교시 다음에 수업이 없을 때
				&& ran == 0
				){
			let cl = arr_class.pop();
			this.arr[ran].setClass(cl);
		}
		return arr_class;
	}
}

function Time(){
	this.cl = null;
	this.isFilled = false;
	this.setClass = (cl) => {
		this.cl = cl;
		this.isFilled = true;
	}
}

function getRanNum(max) {
	let min = 0;
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBtnArea(){
	
	
	
	document.querySelectorAll('span').forEach(item => item.setAttribute('onclick','alert("바꾸려면 초기화해주세요")'));
	
	let btn_area = document.getElementById('btn_area');
	let dom = '';
	dom += `<button onclick="location.reload()">초기화</button>`;
	dom += `<button onclick="pre()">이전</button>`;
	dom += `<button onclick="next()">다음</button>`;
	
	btn_area.innerHTML = dom;
	
}

function pre() {
	if(schedule_idx == 1) {
		return;
	}
	
	schedule_idx--;
	draw(week_list[schedule_idx-1]);
}

function next() {
	if(schedule_idx == week_list.length) {
		let clone = new Array();
		static_arr_active.forEach(item => clone.push(item));
		const week = new Week(clone, 5);
		week.init();
		week.setClassOnDay();
		draw(week.week, true);
	} else {
		schedule_idx++;
		draw(week_list[schedule_idx-1]);
	}
}


