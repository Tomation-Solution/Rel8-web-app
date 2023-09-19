import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomBtn from './CustomBtn/Button';


type Prop ={
    url:string,
    title:string,
    content:string,
    viewMoreFunc?:()=>void
}
export default function CustomCard({ url,title,content,viewMoreFunc}:Prop) {
  return (
    <Card style={{
      width:'100%',
      'minWidth':'250px'
       }}>
      <CardMedia
        component="img"
        alt={title}
        height="160px"
        image={url}
        // classes={'MuiCardMedia-img'}
        style={{'objectFit':'fill'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title?.slice(0,30)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            content.substring(0,86)
          }
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button size="small" 
        onClick={e=>{
            e.preventDefault()
            if(viewMoreFunc){
                viewMoreFunc()
            }
        }}
        >Read More</Button>
        {/* <CustomBtn>
            View
        </CustomBtn> */}
      </CardActions>
    </Card>
  );
}
