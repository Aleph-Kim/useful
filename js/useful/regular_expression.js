// 휴대전화번호
var cell_phone_reg = /^\d{3}\d{3,4}\d{4}$/;

// 일반번호
var phone_reg = /^\d{2,3}\d{3,4}\d{4}$/;

// 인터넷번호
var internet_phone_reg = /^\d{4}\d{4}$/;

// 이메일
var email_reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// url
var url_reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

// 숫자
var num_reg = /[^0-9]/;

// 년-월-일 (YYYY-mm-dd)
var date_reg = /(\d{4})(\d{2})(\d{2})/;