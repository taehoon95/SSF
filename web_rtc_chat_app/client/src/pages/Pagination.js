import React from 'react';
import styled from 'styled-components';
import { Button } from '../../node_modules/@material-ui/core/index';

 const PageUl = styled.ul`
  float:left;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:white;
  padding:1px;
  border-top:2px solid;
  border-bottom:2px solid;
  background-color: rgba( 0, 0, 0, 0.4 );
`;

 const PageLi = styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:5px;
  border-radius:5px;
  width:25px;
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#263A6C;
  }
  &:focus::after{
    color:white;
    background-color:#263A6C;
  }
`;

 const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, plusPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl style={{ marginTop: 20, marginBottom: 20 }} className="pagination">
          {pageNumbers.map(number => (
            <PageLi onClick={() => paginate(number)}  key={number} className="page-item">
              <PageSpan className="page-link">
               {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;