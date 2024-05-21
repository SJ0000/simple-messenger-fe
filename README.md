TODO 0521 : store를 이상하게 사용하고있었는데, 다시 고치기
  - '상태 관리' 스럽게 고치기.
  - 서버에서 관리하는것처럼 하지 말자. 메서드 방식같은건 따라가도되는데, state는 반응형이어야 함.
  - state, action, getter
  - 

Group/Direct Chat 이전메시지 로딩 -- ok

-- todo
- user 별도 store에서 관리 -- ok
- 일부 interface들 class로 변경
  - user -- ok
  - groupChat -- ok
  - directChat 
  

- directChat의 image는 어떻게?
  - 현재는 그냥 기본이미지
  - 이미지 수정은 누가?

- store를 별도로 나누가
  - backend의 repository 역할
    - ref에 의존하지 않고 데이터 관리가 주 목적
  - 말 그대로 상태
    - 현재 선택된 대화방, 모드 등 ref로 처리해야 하는 것들.
  
- vue, typescript에서 reactive 적용 best practice 보기