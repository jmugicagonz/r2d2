import * as React from 'react';
import  TemporaryDrawer from '@/app/components/base-ui/drawer';
import { FormControl, TextField, Stack, Container, Box, Typography } from '@mui/material';
import { VertexSearchConfiguration } from './lib/types';
import { vertexSearchConfigContext } from '../vertex-search-section';
import SettingsIcon from '@mui/icons-material/Settings';
import { grey } from '@mui/material/colors';

export default function VertexSearchConfig () {
    const [openConfig, setOpenConfig] = React.useState(false);
     
    return (
            <React.Fragment>
                <SettingsIcon sx = {{ color: grey['600'] }} onClick={() => setOpenConfig(true)} className='cursor-pointer hover:bg-gray-200/75 rounded-full'/>
                <TemporaryDrawer openConfig={openConfig} setOpenConfig={setOpenConfig} content={<VertexSearchConfigContent/>}/>
            </React.Fragment>
    )
}

function VertexSearchConfigContent () {

    const vertexSearchConfigContextValue = React.useContext(vertexSearchConfigContext);
    if (! vertexSearchConfigContextValue ) {
        throw new Error("Chat config has not been defined. This component will not work.");
     }

    const { vertexSearchConfig, setVertexSearchConfig } = vertexSearchConfigContextValue;

    const onChange = (key: keyof VertexSearchConfiguration, value: VertexSearchConfiguration[typeof key]) =>{
        setVertexSearchConfig({...vertexSearchConfig, [key]: value})
      }

    const handleBlur = (key: keyof VertexSearchConfiguration, value: VertexSearchConfiguration[typeof key]) => {
        onChange(key, value);
    }

    const DataStoreId = () => {
        const [localDataStoreId, setLocalDataStoreId] = React.useState(vertexSearchConfig.DATA_STORE_ID);
        return (
                <TextField
                    label=" Data Store ID "
                    onChange={(e) => 
                        {
                            setLocalDataStoreId(e.target.value);
                        }
                    }
                    value={localDataStoreId}
                    onBlur={() => handleBlur("DATA_STORE_ID", localDataStoreId)}
                />
        );
      }

    const DataStoreProjectId = () => {
        const [localDataStoreProjectId, setLocalDataStoreProjectId] = React.useState(vertexSearchConfig.DATA_STORE_PROJECT_ID);
        return (
                <TextField
                    label=" Data Store Project ID "
                    onChange={(e) => 
                        {
                            setLocalDataStoreProjectId(e.target.value);
                        }
                    }
                    value={localDataStoreProjectId}
                    onBlur={() => handleBlur("DATA_STORE_PROJECT_ID", localDataStoreProjectId)}
                />
        );
    }

    const DataStoreLocation = () => {
        const [localDataStoreLocation, setLocalDataStoreLocation] = React.useState(vertexSearchConfig.DATA_STORE_LOCATION);
        return (
                <TextField
                    label=" Data Store Location "
                    onChange={(e) => 
                        {
                            setLocalDataStoreLocation(e.target.value);
                        }
                    }
                    value={localDataStoreLocation}
                    onBlur={() => handleBlur("DATA_STORE_LOCATION", localDataStoreLocation)}
                />
        );
    }

    return (
        <div>
            <Container>
                <Box paddingTop={4}>
                    <Box display="flex" justifyContent="center" paddingBottom={2}>
                        <Typography variant="h6" component="h2" gutterBottom align="center">
                            Vertex Search Settings
                        </Typography>
                    </Box>
                    <FormControl>
                        <Stack spacing={2}>
                            <DataStoreId />
                            <DataStoreProjectId />
                            <DataStoreLocation />
                        </Stack>
                    </FormControl>
                </Box>
            </Container>
        </div>
    )
}


