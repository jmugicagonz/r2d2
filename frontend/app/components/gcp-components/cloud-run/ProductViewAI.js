"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Divider, Container, Paper, Chip} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { generate } from "./actions";
import Markdown from 'react-markdown';

export default function ProductViewAI({ productDetails }) {
    
    const genAIButtons=[
        {method:"catalog/title", buttonName:"Title"},
        {method:"catalog/description", buttonName:"Description"},
        {method:"catalog/attributes", buttonName:"Attributes"},
        {method:"images/captions", buttonName:"Image Caption"}
      ];

    const [genaiGenerated,setgenaiGenerated] = React.useState(
      "Based on product attributes, you can easily generate product content with generative AI.Try it below!"
    )  ;

    const handleGenerate = async (methodgenAI) => {
        setgenaiGenerated(
          <Container>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Container>
        );
        const response = await generate(methodgenAI,productDetails);
        setgenaiGenerated(
        <Markdown>  
          {response.message}
        </Markdown>
        )  
    }
    return (
    <Container sx={{my:2}}> 
        <AutoFixHighIcon sx={{width:1, my:1}}/>
        { genAIButtons.map((key) =>(
        <Chip sx={{mx:1, my:0.5}} key={key.buttonName} onClick={() => handleGenerate(key.method)} label={key.buttonName}/>
        ))}
        {genaiGenerated && 
        <Paper sx={{marginTop:5, minHeight:20, padding:2, align:"center"}} variant="outlined" square={false}>        
          {genaiGenerated}
        </Paper >
        }
        
    </Container>
  )
}
