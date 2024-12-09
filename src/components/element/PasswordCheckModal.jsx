import React, { useState } from "react";
import styled from "styled-components";
import TheButton2 from "../element/TheButton2";

const PasswordCheckModal = ({
  selectedUserIds,
  ClosePasswordCheckModal,
  getUserList,
}) => {
  console.log(`넘겨받은 id: ${selectedUserIds}`);
  const [password, setPassword] = useState("");

  const deleteUser = async () => {
    // if (selectedUserIds.length === 0) {
    //   alert("삭제할 사용자가 선택되지 않았습니다.");
    //   return;
    // }
    // console.log(`삭제할 사용자 ID: ${selectedUserIds}`);
    // try {
    //   const response = await api.delete("/admin/account", {
    //     data: { adminId: selectedUserIds, password: password },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log("삭제 성공:", response.data);
    //   alert("해당 유저가 삭제되었습니다.");
    //   getUserList();
    // } catch (error) {
    //   alert(`유저삭제 실패`);
    //   console.error("삭제 실패:", error);
    // }
    // // 비밀번호 확인 후 삭제 처리 로직
    // alert("삭제 처리 완료!");
    // ClosePasswordCheckModal(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>비밀번호 확인</ModalTitle>
        <Label>
          <P>비밀번호 :</P>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
          />
        </Label>
        <ButtonContainer>
          <TheButton2 $primary width="200px" onClick={deleteUser}>
            확인
          </TheButton2>
          <TheButton2
            $secondary
            width="200px"
            onClick={ClosePasswordCheckModal}
          >
            취소
          </TheButton2>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PasswordCheckModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 70%;
  height: 34px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const P = styled.p`
  padding-left: 10px;
  width: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;
