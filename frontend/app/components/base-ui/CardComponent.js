import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function CardComponent({imageURL, cardContent, cardActions}){
    const handleImageError = (e) => {
        e.target.onerror = null;
        // e.target.style.display = 'none'
        e.target.src = "https://via.placeholder.com/150"
    }
    return (
        <Card  sx={{borderRadius: 5, height: '100%', display: 'flex', flexDirection: 'column' }} >
            {imageURL && <CardMedia
                component="img"
                image={imageURL}
                onError={handleImageError}
                sx={{
                    padding:"20px",
                    marginX:"auto",
                    backgroundColor:"#E5E4E2"
                }}
            />}
            
            <CardContent sx={{ flexGrow: 1 }}>
                {cardContent}
            </CardContent>
            <CardActions sx={{marginLeft: "auto"}}>
               {cardActions}
            </CardActions>
        </Card>
    )
};
