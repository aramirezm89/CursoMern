import React from 'react';
import {Pagination as PaginationAntd} from "antd";

export default function Pagination(props) {
    const {posts,history,location} = props;

    const onChangePage= newPage =>{
        history.push(`${location.pathname}?page=${newPage}`)
    }
    
    return (
        
        <PaginationAntd 
            defaultCurrent={1}
            total={posts.total}
            pageSize={parseInt(posts.limit)}
            onChange={newPage => onChangePage(newPage)}
        />
    )
}
