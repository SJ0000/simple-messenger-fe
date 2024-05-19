Group/Direct Chat 이전메시지 로딩

-- todo
- user 별도 store에서 관리
- 일부 interface들 class로 변경
  - user (ok)
  - groupChat
  - directChat
- directChat의 image는 어떻게?
  - 현재는 그냥 기본이미지
  - 이미지 수정은 누가?

- store를 별도로 나누가
  - backend의 repository 역할
    - ref에 의존하지 않고 데이터 관리가 주 목적
  - 말 그대로 상태
    - 현재 선택된 대화방, 모드 등 ref로 처리해야 하는 것들.