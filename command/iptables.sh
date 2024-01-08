# 특정 ip 차단
iptables -A INPUT -s 000.000.000.000 -j DROP

# 특정 ip 대역 차단
iptables -A INPUT -s 000.000.000.0/24 -j DROP

# 특정 ip 차단 해제
iptables -D INPUT -s 000.000.000.000 -j DROP

# 차단 리스트(호스트 이름 / 서비스 이름 조회)
iptables -L 

# 차단 리스트(호스트 이름 / 서비스 이름 비조회, 줄 번호 출력)
iptables -nL --line-numbers

# 차단 횟수 조회
iptables -L -nvx
