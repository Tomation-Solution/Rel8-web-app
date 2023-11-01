import styled from 'styled-components';


/* light blue - #1771a3

thick blue - #1771a3
*/
export const HomeLayout = styled.div`
    /* margin: 0 auto; */
@media screen and (min-width: 800px){
        /* padding: 1.8rem; */
        display: flex;
        max-width: 2000px;
        margin: 0 auto;
        gap: 30px;
        justify-content: space-between;
}
@media screen and (min-width: 1700px){
    /* gap:  0 30px; */
    /* border: 1px solid red; */

}

`



export const MeetingHeader = styled.div`
    background-color: #1771a390;
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between  ;
    /* max-width: 700px; */
    width: 100%;
    h3{
        border:10px solid white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center  ;
    }

    @media screen and (min-width: 500px) {
    padding: 1rem 1.5rem;
    }
`

export const MainPane = styled.div`
/* max-width:900px; */
width: 70%;
padding: 1rem;

`
export const SidePane = styled.aside`
display: flex;
flex-direction: column;
/* border: 1px solid red; */
width: 30%;

    .sideImages{
        width: 250px;
        border-radius: 10px;
        display: block;
        margin: 20px auto;
        
    }
p{  
    color:#1771a3 ;
}
`



export const GalleryEventGrid = styled.div`
    padding: 1rem;
    max-width: 900px;
    margin: 0 auto;
    .galleryContainer{
        position:  relative;
    }
 .galleryContainer img{
    width: 100%;
    height: 100%;
    border-radius: 10px;

 }
 .galleryContainer p{
    color: #1771a3;
 }
 .galleryContainer h2{
    position: absolute;
    top: -30px;
 }
 @media screen  and (min-width: 900px){
    display: flex;
    /* align-items: center; */
    padding: 1.5rem 0;
    .galleryContainer{
        overflow: visible;
    }
    .galleryContainer img{
        object-fit: cover;
        height: 100%;
        
    }

&> div:nth-child(1){
    width: 40%;
}
&> div:nth-child(2){
    width: 60%;

}
 }
`


export const EventContainerV2 = styled.div`
 
 @media screen  and (min-width: 700px){
    display: flex;
    justify-content: space-between;
    /* align-items: center */

 }
`

export const EventV2 = styled.div`
width: 100%;
    margin: 1rem;
        padding: 1rem 0;
    p{
        /* padding:.5rem 0; */
    }
    img{
        width: 100%;
    border-radius: 10px;
    height: 140px;
        /* height: 80%; */
    }
    .btn_container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 150px;
    }
    button{
        border: transparent;
        display: inline-block;
        padding: .5rem 1rem;
        cursor: pointer;
    }
    button.not_main{
        border: 1px solid #1771a3;
        color:  #1771a3;
    }
    button.main{
        background-color: #1771a3;
        color: white;
    }
`

export const PublicationContainerv2 = styled.div`
    padding: 1rem 0;
    gap:0 .7rem;
    width: 100%;
    @media screen  and (min-width:500px){
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
`

export const Publicationv2 = styled.div`
    /* padding: .4rem; */
    div{
        padding: 0 .5rem;
    }
        img{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius:10px;
        }
`