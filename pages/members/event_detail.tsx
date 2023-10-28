import { NextPage } from "next";
import { useEffect,useState } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import {getEventAttendies} from '../../redux/memeberEvents/memeberEventsApi'
import CustomBtn from "../../components/CustomBtn/Button";
import BasicModal from "../../components/Modals";
import { Box, TextField } from "@material-ui/core";
import { registerForEventApi } from "../../redux/events/eventsApi";
import useToast from "../../hooks/useToast";
import MeetingRegistration from "../../components/Meeting/MeetingRegistration/MeetingRegistration";
import axios from "../../helpers/axios";
import useDynamicPaymentApi from "../../redux/payment.api";
import * as React from 'react'

export const RequestRescheduleForm = (event_id:any):React.ReactElement=>{
  const [date,setDate] = useState<any>();
  const [time,setTime] = useState<any>();
  const {notify} = useToast()
  console.log({'eventid':event_id})
  const onSubmit = async ()=>{
    

    const data = {
      "event":event_id,
      "startDate":date,
      "startTime":time
  }
  console.log({data})
  try{
    const resp =await axios.post('/tenant/event/request-reschedule/',data)
      console.log(resp)
  }catch(e:any){
    console.log({e})
  }

  }
  return (
    <form style={{'textAlign':'center','padding':'1rem'}}>
          <h2>Request for Reschedule</h2>
          <br />
        <p>The even date does not work for you? request reschedule</p>
<br /><br /><br />
        {/* @ts-ignore */}
            <TextField 
                    placeholder='Date'
                    // label='Password'
                    required
                    size='small'
                    style={{width:'100%',}}
                    type={'time'}
                    onChange={e=>{
                      setDate(e.target.value)
                    }}
                    />
<br /><br /><br />
        {/* @ts-ignore */}
                     <TextField 
                    placeholder='Date'
                    // label='Password'
                    required

                    size='small'
                    style={{width:'100%',}}
                    type={'date'}
                    onChange={e=>{
                      setDate(e.target.value)
                    }}
                    />
                    <br />
                    <br />
        {/* @ts-ignore */}
                    <CustomBtn 
                    onClick={e=>{
                      e.preventDefault()
                      onSubmit()}}
                    style={{'width':'200px','margin':'0 auto'}}>
                      Submit
                    </CustomBtn>
    </form>
  )
}

const EventDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      const {pay,loadingPay} = useDynamicPaymentApi()
      const {notify} = useToast()
      const {attendies,status,errorMessage} = useAppSelector(selectMemberEvent)
      const dispatch = useAppDispatch();
      const [open,setOpenLogout] = useState(false)
      const [acceptMeeting,setOpenAcceptMeeting] = useState(false)
      const [askQuetion,setAskQuetion] = useState(false)
      const [openReSchedule,setOpenReSchedule] = useState(false)
    useEffect(()=>{
        if(typeof window != 'undefined'){
            const  event = JSON.parse(localStorage.getItem('event_detail'))
            dispatch(getEventAttendies({'event_id':event.id}))
        }
      },[])
      useEffect(()=>{
        if(status=='created'){
            notify("Registration Success",'success')
        }
        if(status==='error'){
            notify(errorMessage,'error')
        }
      },[status])
      if(typeof window == 'undefined'){
        // @ts-ignore
        return <Spinner/>
      }

      let data:any = null
      if( localStorage.getItem('event_detail')){
        data  = JSON.parse(localStorage.getItem('event_detail'))
      }


      const prop_columns = [ {
        Header:'Email',
        accessor:'email',
        id:1,},
        {
            Header:'Full Name',
            accessor:'full_name',
        //     Cell:(tableProps:any)=>(
        //         <p>
        //         {
        //             tableProps.row.original.member_info.find(d=>{
        //                 return d.name.toLocaleLowerCase() == 'name' ||  d.name.toLocaleLowerCase() == 'first' ||d.name.toLocaleLowerCase() == 'first name' || d.name.toLocaleLowerCase() == 'surname'
        //             })['value']}</p>)
        }
      ]
    return (
          // @ts-ignore
    <DashboardLayout>

        {
            status==='pending'|| loadingPay?
          // @ts-ignore
    
            <Spinner/>:''
        }
{/* RequestRescheduleForm */}
{/*  @ts-ignore */}
<BasicModal 
        handleClose={setOpenReSchedule}
        open={openReSchedule}
        body={
          <>
          {data?
          // @ts-ignore
        <RequestRescheduleForm event_id={data.id }/>
        :''  
        }
          </>
        }
        />
        {/* @ts-ignore */}
<BasicModal 
        handleClose={setOpenAcceptMeeting}
        open={acceptMeeting}
        // @ts-ignore
        body={<MeetingRegistration
        heading="Participant Registration"
          Submit={(value)=>{
            console.log(value)
            // const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

            // dispatch(registerForMeeting({'meetingID':meeting.id,'proxy_participants':value.participant}))
            dispatch(registerForEventApi({
                'event_id':data.id,
                'proxy_participants':value.participant
            }))  
        }}
        />}
        />
        
        {/* @ts-ignore */}
<BasicModal
        open={askQuetion}
        handleClose={setAskQuetion}
        body={

          <div>
        {/* @ts-ignore */}
            <Box style={{'textAlign':'center','padding':'.8rem'}}>
        
<div>
<h2>Register for Event</h2>
        <br />
        <p>do you want to invite other to this event or you want to register your self only</p>
        <br />
        <br />
       
        <div style={{'display':'flex'}}>
        {/* @ts-ignore */}
          <CustomBtn style={{'marginRight':'10px'}}
          onClick={()=>{
          const event  = JSON.parse(localStorage.getItem('event_detail'))
          dispatch(registerForEventApi({
              'event_id':data.id,
              // 'proxy_participants'
          }))
          // dispatch(registerForMeeting({'meetingID':meeting.id}))
          
          }}
          >Register Only</CustomBtn>
          {/* @ts-ignore */}
          <CustomBtn styleType="sec"
          onClick={e=>{
            setAskQuetion(false)
            setOpenAcceptMeeting(true)}}
          >Register and invite proxy</CustomBtn>
        </div>
</div>
      </Box>
          </div>
        }
        />















            <div
                style={{
                    'maxWidth':'800px','margin':'0 auto'
                }}
            >

<img src={data?.image} alt=""  style={{'width':'100%',
            'height':isLaptop?'400px':'300px','objectFit':'cover'}}/>

            <br />
            <br />
            <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
            <p>
                Event Status: <strong>{data.is_paid_event?'Paid':'Free'}</strong>
            </p>
            <p>
                Event {
                    data.event_access.link.includes('https')?
                'link'
                :
                'Addresse'
              }:  
              {
                 data.event_access.link.includes('https')?
                   <a onClick={e=>{
                    e.preventDefault()
                    window.open(data.event_access.link,'_blank')
                   }} style={{'color':'green','textDecoration':'underline','cursor':'pointer'}} target='_blank' rel="noreferrer">Vist event link</a>
              :
              data.event_access.link
                }
            </p>
            <br />
            {
                data.event_docs?
                // @ts-ignore
            <CustomBtn 
            onClick={e=>{
                window.open(data.event_docs,'_blank')
            }}
            style={{'width':'200px'}}>
            Download Event File
            </CustomBtn>:''
            }
            {/* event_docs */}
            <br />
        {/* @ts-ignore */}
            <Table prop_columns={prop_columns} custom_data={attendies}/>
            </div>
            <br /><br />
              <br /><br />


            <div  style={{'display':'flex','maxWidth':'600px','margin':'0 auto','justifyContent':'space-between'}}>
        {/* @ts-ignore */}
                    <CustomBtn 
                        onClick={e=>{
                          if(data.is_paid_event){
                            pay({
                              'forWhat':'event_payment',
                              'payment_id':data.id,
                              'query_param':''
                            })
                          return
                          }
        
                        setAskQuetion(true)
                        }}
                        style={{'width':'25%'}}>
                        
                        {
                          data.is_paid_event?
                          'Pay For Event':'Join'
                        }
                        </CustomBtn>

                        {/* <CustomBtn styleType='sec' 
                        onClick={(e)=>setOpenReSchedule(true)}
                        style={{'width':'25%'}}>
                        Request reSchedule
                        </CustomBtn> */}

            {
                data.meeting_docs?
                // @ts-ignore
                <CustomBtn style={{'width':'25%',}}
                onClick={(e)=>{
                    window.open(data.meeting_docs,'_blank')
                }}
                >
                                Attachment doc

                </CustomBtn>:''
            }   

            </div>



        </DashboardLayout>
    )
} 

export default EventDetail