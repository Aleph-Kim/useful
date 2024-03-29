# mac ip 조회
ifconfig | grep inet

# 디렉토리 사이즈 조회
du -sh (디렉토리 경로)
Ex 1. /home/image 디렉토리의 사이즈를 조회
    du -sh /home/image
Ex 2. 현재 위치한 디렉토리의 사이즈를 조회
    du -sh *


# 디렉토리 내 파일 개수 조회
ls -l | grep ^- | wc -l
설명 : `ls -l`로 현재 디렉토리의 파일 및 디렉토리 목록을 표시한 다음, `grep ^-` 를 사용하여 파일만 필터링하고, `wc -l`로 파일 수를 세어 출력


# 특정 경로 내 모든 파일의 소유자와 그룹, 권한 일괄 변경
current_directory=특정_경로
chown -R 소유자:그룹 "$current_directory" && chmod -R 권한 "$current_directory"
Ex. /home/directory 경로 내 모든 파일의 소유자와 그룹을 "test"로 변경, 권한은 -rwxrwxrwx로 변경
    current_directory=/home/directory
    chown -R test:test "$current_directory" && chmod -R 777 "$current_directory"

# requirements.txt 자동 생성
pip freeze > requirements.txt