import { NextPage } from "next";
import {useEffect,useState} from 'react';
import React from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useMediaQuery } from 'react-responsive'
import Spinner from "../../components/Spinner";
import {Grid, Button, Typography} from '@mui/material';
import {MemberPublicationType} from '../../redux/memberPublication/memberPublicationAPi'
import { MemberNewsType } from "../../redux/memberNews/memberNewsApi";
import { createPublicationComment, deletePublicationComment, getPublicationComment } from "../../redux/publication/publicationApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPublication } from "../../redux/publication/publicationSlice";
import { ContentReactionContainer } from "../../styles/news.style";
import {GoThumbsup,GoThumbsdown} from 'react-icons/go'
import PostComentDetails from "../../components/PostComentDetails/PostComentDetails";
import CommentInputWIthLabel from "../../components/CommentInputWIthLabel/CommentInputWIthLabel";


const NewsDetail:NextPage=()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
    const [data,setData] = useState<any|MemberNewsType>()
    const dispatch = useAppDispatch()
     
    const  {comment,commentStatus}  = useAppSelector(selectPublication)
    
    useEffect(()=>{
        if( localStorage.getItem('publication_detail')){
            setData(JSON.parse(localStorage.getItem('publication_detail')))
            const publication = JSON.parse(localStorage.getItem('publication_detail'))
            dispatch(getPublicationComment({'publication_id':publication.id}))
          }
    },[])
    //   if(typeof window == 'undefined'){
    //     return <Spinner/>
    //   }
    //   let data:any = null
    //   if( localStorage.getItem('publication_detail')){
    //     data  = JSON.parse(localStorage.getItem('publication_detail'))
    //   }
    return (
        <DashboardLayout>
             <img src={data?.image} alt="" 
             style={{'display':'block','borderRadius':'10px','width':'400px','height':'300px','margin':'0 auto'}}
             />
{
commentStatus=='loading'?<Spinner/>:''
}


            <div style={{'padding':'0  1rem','margin':'0 auto','maxWidth':'900px',}}>
                            <h2 style={{'textAlign':'center'}}>{data?.name}</h2>

                            {
                data?.body?
                <div
               dangerouslySetInnerHTML={{
                 __html: `${data.body}`,
               }}
             />:''
                }
                
            </div>

            {/* <ContentReactionContainer>
                <div className="" style={{'padding':'0 .4rem'}}>
                    <GoThumbsup/>
                    <p>Like</p>
                </div>
                <div className="">
                    <GoThumbsdown/>
                    <p>Dislike</p>
                </div>
            </ContentReactionContainer> */}
            <br />
            <div style={{'margin':'0 auto','maxWidth':'500px'}}>
           {
               comment.map((data:any,index:number)=>(
                    <PostComentDetails
                    deleteItem={(itemId)=>{
                        dispatch(deletePublicationComment(itemId))
                    }}
                    data={data} key={index}/>
                ))
            }
            <br />
            <br />
            <CommentInputWIthLabel submit={(value)=>{
                console.log({'value':value})
                if(data){
                    dispatch(createPublicationComment({
                        'news':data.id,
                        'comment':value
                    }))
                }
            }}/>
           </div>
           <br /><br />
        </DashboardLayout>
    )
}

export default NewsDetail