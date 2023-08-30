import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
import BasicPopover from '../../../PopOver';
import axios from '../../../../helpers/axios';
import { useEffect, useState } from 'react';
import { getUserOrNull } from '../../../../utils/extraFunction';
import NofiicationComponent from '../../../NofiicationComponent'

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  // boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, type, ...other } = props;
  const [notification ,setNotification] =useState([])
  const user =getUserOrNull()

  const getNotification  = async ()=>{
    try{
      const resp = await axios.get('/tenant/reminder/member_reminder/')
      setNotification(resp.data.results)

    }catch(err){
      setNotification([])
    }
  }
  useEffect(()=>{
    getNotification()
  },[])
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 190
          },
          width: {
            lg: 'calc(100% - 180px)'
          },
          backgroundColor:'#fff',
          boxShadow:'none'
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

<Box style={{'justifyContent':'space-between','display':'flex','width':'80%','margin':'0 auto','alignItem':'center'}}>

          <Typography className='text' fontWeight='bold' sx={{color:'black'}} >
            {type}
             {/* Dashboards */}
          </Typography>

             {/* </DashboardLayoutRoot> */}
      {
        user?
        <NofiicationComponent
        user={user}
        />
        :''
      }
</Box>
            
          
            {/* <UserCircleIcon fontSize="small" /> */}
          {/* </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
