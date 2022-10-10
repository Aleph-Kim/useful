// 휴대전화번호 정규식
var cell_phone_reg = /^\d{3}\d{3,4}\d{4}$/;

// 일반번호 정규식
var phone_reg = /^\d{2,3}\d{3,4}\d{4}$/;

// 인터넷번호 정규식
var internet_phone_reg = /^\d{4}\d{4}$/;

// 이메일 정규식
var email_reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// url 정규식
var url_reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/