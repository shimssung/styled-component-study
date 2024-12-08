// App.js
import TheButton from "./components/element/TheButton";
import UserList from "./UserList";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [adminInfo, setAdminInfo] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    // 더미 데이터 생성
    const generateDummyData = () => {
      const dummyData = [];
      for (let i = 1; i <= 25; i++) {
        dummyData.push({
          id: uuidv4(),
          nickName: `User${i}`,
          empName: `Employee${i}`,
          updatedAt: `2024-12-07T${i}:00:00`,
        });
      }
      setAdminInfo(dummyData);
    };

    generateDummyData();
  }, []);

  const handleSelectionChange = (selectedIds) => {
    setSelectedUserIds(selectedIds); // 선택된 아이디 배열을 상태로 저장
  };

  useEffect(() => {
    console.log(`선택된 애들: ${JSON.stringify(selectedUserIds, null, 2)}`);
  }, [selectedUserIds]);

  const deleteHandelr = () => {
    // 선택된 아이디를 API로 DELETE 요청

    console.log("선택된 ID:", selectedUserIds);
  };

  const addHandelr = () => {
    // API로 POST 요청, 새로운 관리자 정보를 추가
    console.log(`addHandelr`);
  };

  return (
    <div className="App">
      <Container>
        <ButtonContainer>
          <TheButton $primary onClick={addHandelr}>
            추가
          </TheButton>
          <TheButton $danger onClick={deleteHandelr}>
            삭제
          </TheButton>
        </ButtonContainer>
        <UserList
          title="관리자 목록"
          thead={["", "이름", "아이디", "가입날짜"]}
          data={adminInfo}
          itemsPerPage={11}
          columns={["nickName", "empName", "updatedAt"]}
          onSelectionChange={handleSelectionChange} // 부모 컴포넌트로 선택된 아이디 전달
        />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
`;
