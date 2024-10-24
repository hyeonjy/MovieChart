# 1. 프로젝트 소개 
### Intro: 영화 검색 사이트 만들기 <br>
(1) 소개 : TMDB API를 사용해 영화 정보를 검색하고, 데이터를 기반으로 만든 웹 애플리케이션<br>
(2) 목표 : TMDB의 수많은 영화 데이터를 실시간으로 가져와 영화 검색, 정보 조회가 가능하도록 영화 앱을 만들었다.<br>
(3) 개발기간 : 2024.10.16 ~ 2024.10.23

<br>

# 2. 구현기능
## (1) 배너
![배너2](https://github.com/user-attachments/assets/44a6322e-6a3a-4d51-8dfd-092b8451c6d4)

- TMDB 영화 데이터를 가져와서 랜덤으로 해당하는 배너 영상을 띄운다.

## (2) 조회
### # 실시간 인기 영화, Now playing 목록을 확인
![목록](https://github.com/user-attachments/assets/8c0d496a-1522-474d-828d-e314e87224ab)
- TMDB API에서 인기 영화, Now playing 데이터를 가져오는 작업을 했다.
- 각 영화 카드는 반응형 슬라이드쇼 및 스와이퍼 기능을 구현하도록 Swiper.js라는 라이브러리를 사용하였다.

### # 영화 상세페이지 구현
![모달1](https://github.com/user-attachments/assets/132cfcfa-f4f6-4160-9db5-58eeeeee8f6d)
- 각 영화 카드를 클릭했을 때, **모달 창**을 통해 영화의 **상세 정보**(예: 줄거리, 평점, 개봉일 등)를 API에서 추가로 받아와 화면에 표시했다.
- 영화 id 값에 해당하는 비디오 데이터가 있으면 해당하는 유튜브 영상을 표시하고, 데이터가 없으면 영화 포스터로 대체하였다.

## (3) 검색
![검색](https://github.com/user-attachments/assets/a5ca8d40-6596-4fda-a617-ed3899fa10fc)
- 사용자가 입력한 **키워드**에 맞춰 영화 리스트를 필터링하여 해당 키워드를 포함한 영화들만 리스트에 나타나게 하였다.

## (4) 로컬 저장소 활용한 찜하기
![찜하기1](https://github.com/user-attachments/assets/54da3357-cbb8-46e5-ab13-7e343f02f321)
- 찜하기 버튼을 눌렀을 때, localStorage에 관련 데이터를 저장하여 favoriate 페이지에서 찜한 목록을 볼 수 있다.
