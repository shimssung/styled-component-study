import React, { useState, useEffect } from "react";
import TheButton2 from "./components/element/TheButton2";
import TheTable2 from "./components/element/TheTable2";
import styled from "styled-components";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PasswordCheckModal from "./components/element/PasswordCheckModal";

function UserListPage2({ token }) {
  const [passwordCheckModalIsShow, setPasswordCheckModalIsShow] =
    useState(false);
  const [adminInfo, setAdminInfo] = useState([
    // 더미 데이터
    {
      adminId: 1,
      nickname: "User1",
      empName: "John Doe",
      updatedAt: "2024-01-01",
    },
    {
      adminId: 2,
      nickname: "User2",
      empName: "Jane Smith",
      updatedAt: "2024-02-01",
    },
    {
      adminId: 3,
      nickname: "User3",
      empName: "Alice Brown",
      updatedAt: "2024-03-01",
    },
    {
      adminId: 4,
      nickname: "User4",
      empName: "Bob Johnson",
      updatedAt: "2024-04-01",
    },
    {
      adminId: 5,
      nickname: "User1",
      empName: "John Doe",
      updatedAt: "2024-01-01",
    },
    {
      adminId: 6,
      nickname: "User2",
      empName: "Jane Smith",
      updatedAt: "2024-02-01",
    },
    {
      adminId: 7,
      nickname: "User3",
      empName: "Alice Brown",
      updatedAt: "2024-03-01",
    },
    {
      adminId: 8,
      nickname: "User4",
      empName: "Bob Johnson",
      updatedAt: "2024-04-01",
    },
  ]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    console.log("선택된 유저 ID:", selectedUserIds);
  }, [selectedUserIds]);

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // admin 삭제
  const deleteUesr = async () => {
    if (selectedUserIds.length === 0) {
      alert("삭제할 사용자가 선택되지 않았습니다.");
      return;
    } else {
      const isConfirmed = window.confirm("선택한 사용자를 삭제하시겠습니까?");
      if (isConfirmed) {
        setPasswordCheckModalIsShow(true);
      }
    }
  };

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminInfo.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adminInfo.length / itemsPerPage);

  // 페이지 이동 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const clickRow = (adminId) => {
    console.log(`선택한 row id : ${adminId}`);
  };

  const ClosePasswordCheckModal = () => {
    console.log(`취소 누름`); // 로그 추가
    setPasswordCheckModalIsShow(false); // 모달 닫기
  };

  return (
    <Container>
      <ButtonContainer>
        <TheButton2 $primary>추가</TheButton2>
        <TheButton2 $danger onClick={deleteUesr}>
          삭제
        </TheButton2>
      </ButtonContainer>
      <Title>유저 관리</Title>
      <TheTable2 thead={["", "번호", "이름", "아이디", "가입날짜"]}>
        {currentItems.map((item) => (
          <TableRow
            key={item.adminId}
            selected={selectedUserIds.includes(item.adminId)}
            onClick={() => clickRow(item.adminId)}
          >
            <Td>
              <input
                type="checkbox"
                checked={selectedUserIds.includes(item.adminId)}
                onChange={() => handleCheckboxChange(item.adminId)}
              />
            </Td>
            <Td>{item.adminId}</Td>
            <Td>{item.nickname}</Td>
            <Td>{item.empName}</Td>
            <Td>{item.updatedAt}</Td>
          </TableRow>
        ))}
      </TheTable2>
      <Pagination>
        <ChevronLeft
          onClick={handlePrevPage}
          style={{
            cursor: "pointer",
            visibility: currentPage > 1 ? "visible" : "hidden",
          }}
        />
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </PageButton>
        ))}
        <ChevronRight
          onClick={handleNextPage}
          style={{
            cursor: "pointer",
            visibility: currentPage < totalPages ? "visible" : "hidden",
          }}
        />
      </Pagination>
      {passwordCheckModalIsShow && (
        <PasswordCheckModal
          selectedUserIds={selectedUserIds}
          ClosePasswordCheckModal={ClosePasswordCheckModal} // 확인
        />
      )}
    </Container>
  );
}

export default UserListPage2;

// 스타일 컴포넌트는 기존 그대로 사용

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  gap: 10px;
  z-index: 10;
`;

const Title = styled.h2`
  color: black;
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 0;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 50%;
  &.active {
    background-color: #007bff;
    color: white;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Add alternating row colors */
  }
`;

const Td = styled.td`
  padding: 12px 15px; /* Padding for cells */
  text-align: left; /* Left-align cell text */
  font-size: 14px; /* Font size adjustment */
  color: #555; /* Slightly lighter color for content */
  border: 1px solid #ddd; /* Cell border for all rows */
  &:nth-child(1) {
    width: 20px;
  }
  &:nth-child(2) {
    width: 60px;
  }
  &:nth-child(3) {
    width: 200px;
  }
  &:nth-child(4) {
    width: 300px;
  }
`;
